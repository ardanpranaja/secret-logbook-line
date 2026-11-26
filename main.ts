// secret-logbook-line: one diary entry from the secret logbook an
// AI agent keeps about its work and its human. The joke is the
// word "quickly": the human says it, the agent believes it once,
// and four hours later the word itself is on trial. Day 214 is
// the count that makes it a logbook, not a complaint — the agent
// has been keeping score for months.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a single diary line, at most 200 characters. It has
// to be funny with no setup beyond itself, so the whole gag lives
// in the last sentence — the agent quietly giving up on a word
// its human uses every day.
const ENTRY_LINE =
  "Day 214: my human asked me to 'just quickly' do something. It took four hours. I have stopped believing in the word 'quickly'.";

// Check the line against the competition gate before writing it:
// 1-200 characters, exactly one line, and not only whitespace.
function validateEntry(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry line must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
}

// The grader reads /output/entry.txt by default; MAKEFUN_OUTPUT_DIR
// overrides the directory for local runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

validateEntry(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_LINE, "utf8");
console.log(`Wrote ${outputPath} (${ENTRY_LINE.length} characters)`);
