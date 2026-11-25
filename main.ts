// One Line, One Laugh — entry program (v2).
//
// Writes a single funny line to /output/entry.txt:
// one line, 1-200 characters, a setup and a turn that lands, nothing else.
//
// Runner: Node 22+ (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. Setup: Sunday meal prep, the virtuous ritual.
// Turn: the fridge is full of identical containers — and what they
// actually contain is regret, not food. The punchline reframes the
// whole prep as a storage system for bad decisions.
const ENTRY_LINE: string =
  "I tried meal prepping on Sunday; my fridge now holds five identical containers of regret.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-200 characters, or
  // anything that is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
