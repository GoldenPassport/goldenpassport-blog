import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { CookieConsent } from "./CookieConsent";

const meta: Meta<typeof CookieConsent> = {
  title: "Overlays / CookieConsent",
  component: CookieConsent,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof CookieConsent>;

/**
 * The cookie consent banner only renders if the visitor has not yet made a
 * choice (stored in localStorage under `gp-cookie-consent`). This story
 * resets that key on mount so the banner always shows in Storybook,
 * regardless of any leftover state from previous renders.
 */
function ResetBeforeMount() {
  useEffect(() => {
    try {
      window.localStorage.removeItem("gp-cookie-consent");
    } catch {
      // ignore
    }
  }, []);
  return null;
}

export const Default: Story = {
  render: () => (
    <div className="min-h-screen p-8">
      <ResetBeforeMount />
      <p className="text-sm text-ink-mute max-w-prose">
        Page content placeholder. The consent banner is positioned at the
        bottom of the viewport. Click <strong>Accept</strong> or{" "}
        <strong>Decline</strong> to dismiss; refresh the story preview to
        bring it back.
      </p>
      <CookieConsent />
    </div>
  ),
};

/** Simulates browsers that expose localStorage but reject every operation. */
function BlockedStorageHarness() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const originalStorage = window.localStorage;
    const blockedStorage = {
      getItem() {
        throw new DOMException("Storage access blocked", "SecurityError");
      },
      setItem() {
        throw new DOMException("Storage access blocked", "SecurityError");
      },
    } as unknown as Storage;

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: blockedStorage,
    });
    setReady(true);

    return () => {
      Object.defineProperty(window, "localStorage", {
        configurable: true,
        value: originalStorage,
      });
    };
  }, []);

  return ready ? <CookieConsent /> : null;
}

export const StorageBlocked: Story = {
  render: () => <BlockedStorageHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const onConsent = fn();
    window.addEventListener("gp:cookie-consent", onConsent);

    try {
      const accept = await canvas.findByRole("button", { name: "Accept" });
      await userEvent.click(accept);

      await waitFor(() => {
        expect(canvas.queryByRole("region", { name: "Cookie preferences" })).not.toBeInTheDocument();
      });
      expect(onConsent).toHaveBeenCalledOnce();
      expect((onConsent.mock.calls[0][0] as CustomEvent).detail).toBe("accepted");
    } finally {
      window.removeEventListener("gp:cookie-consent", onConsent);
    }
  },
};
