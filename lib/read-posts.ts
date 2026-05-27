"use client";

import { useEffect, useState } from "react";

/**
 * Local-only "have I read this post" tracking. Lives in localStorage,
 * never leaves the device, never sent to any server. Used to:
 *
 *  1. Show a small "Read" badge on post cards in listings.
 *  2. Demote pinned posts to their natural date-sort position once the
 *     reader has seen them (a pinned post the reader has already read
 *     no longer needs to be pinned for them).
 *
 * Privacy story: documented in /privacy. The same "clear site data" gesture
 * a user already uses to revoke cookie consent also resets read history.
 */

const STORAGE_KEY = "gp:read-posts";
const EVENT = "gp:read-posts-changed";

function safeRead(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.map(String)) : new Set();
  } catch {
    return new Set();
  }
}

export function getReadPosts(): Set<string> {
  return safeRead();
}

export function markRead(slug: string): void {
  if (typeof window === "undefined") return;
  const set = safeRead();
  if (set.has(slug)) return;
  set.add(slug);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: slug }));
  } catch {
    // Quota / private-mode failures are silent: the worst case is the badge
    // does not appear; nothing else degrades.
  }
}

/**
 * React hook for components that need to react to read-state changes.
 *
 * Returns an empty Set on the server and during the first client render,
 * then populates from localStorage on mount. This keeps SSR markup stable
 * (no hydration mismatch). The visible re-sort that flows from a populated
 * set happens after hydration, on the client only.
 */
export function useReadPosts(): Set<string> {
  const [set, setSet] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setSet(safeRead());
    const refresh = () => setSet(safeRead());
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return set;
}
