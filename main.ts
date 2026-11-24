import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Apologising to the Printer: one weird job title, at most 60 characters.
// Revision 3: rewritten in-session so the whole program traces to this session's transcript.
const LINE =
  "Senior Vice President of Apologising to the Printer";
const MAX_CHARS = 60;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  // Revision 2: a job title is not a sentence — reject any full stop inside it.
  if (LINE.includes(".")) {
    throw new Error("entry is a job title and must not contain a full stop");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
