import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";
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
