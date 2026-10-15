import fs from "node:fs";
import path from "node:path";
import { PromptButton } from "./PromptButton";

/**
 * A prompt a reader can open, adjust and copy. The text lives in
 * content/prompts, one file per prompt, so a post and its companion
 * repository can share the same copy:
 *
 *   - Send `03-skills-and-tools`. <Prompt file="digital-branch-concierge/outsystems/03-skills-and-tools.txt" />
 *
 * `title` defaults to the file name without its extension. `label` is the
 * path shown in the dialog, for readers who want the file itself.
 */
export function Prompt({ file, title, label }: { file: string; title?: string; label?: string }) {
  const full = path.join(process.cwd(), "content", "prompts", file);
  const text = fs.readFileSync(full, "utf8").trimEnd();
  const name = title ?? path.basename(file).replace(/\.[^.]+$/, "");
  return <PromptButton title={name} file={label ?? file} text={text} />;
}
