// Entry for make.fun bounty "The Best Meal You Ever Had"
// (u-pangg7-the-best-meal-you-ever-had-a3ac0f85).
// Node stdlib only. No network, no API key, no clock, no randomness.
// Writes the winning sentence to /output/entry.txt with no trailing
// newline, then reads it back and verifies it is byte-identical.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "At a Penang night market, I ate chicken satay blackened over charcoal, the peanut sauce running down my wrist, and I licked it clean before anyone saw.";

// REVISI (karangan sendiri): "so smoky" diganti "blackened over charcoal"
// karena lebih konkret — pembaca langsung melihat sate yang menghitam di
// atas arang, bukan sekadar diberi tahu rasanya berasap. Kata "running"
// menggantikan "ran" supaya saus terasa masih menetes saat adegan itu
// berlangsung, bukan sudah selesai.

const OUTPUT_PATH = "/output/entry.txt";

// Validate: 1-200 characters counted in code points, one line, no
// control characters, and not whitespace only.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace only");
}
for (const ch of ENTRY) {
  const code = ch.codePointAt(0) as number;
  if (code < 0x20 || code === 0x7f) {
    throw new Error(`entry contains a control character U+${code.toString(16)}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Read back and confirm the file is byte-identical before exiting.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("verification failed: /output/entry.txt does not match entry");
}
const bytes = Buffer.byteLength(ENTRY, "utf8");
console.log(`wrote ${OUTPUT_PATH} (${chars.length} chars, ${bytes} bytes)`);
