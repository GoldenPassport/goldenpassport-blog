import { TestConversation } from "./TestConversation";

/**
 * A list of test messages readers can copy into the n8n chat, each with its
 * test id and the result to expect. The list itself is static; each item is a
 * small client component for the copy button.
 *
 *   <TestConversations>
 *
 *   <TestConversation testId="T01" message="What is my balance?">
 *
 *   **Expect:** `fetch_balance` runs and the reply goes straight through.
 *
 *   </TestConversation>
 *
 *   </TestConversations>
 *
 * A trailing `[customer:C1001]` tag in `message` is shown as a separate chip,
 * so it reads as an instruction rather than as something the customer says,
 * and it is still included when the message is copied.
 */
export function TestConversations({ children }: { children: React.ReactNode }) {
  return <ul className="not-prose my-8 list-none space-y-6 p-0">{children}</ul>;
}

export { TestConversation };
