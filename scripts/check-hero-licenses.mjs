import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const heroDir = path.join(process.cwd(), "public/images/hero");
const licensePath = path.join(heroDir, "LICENSES.md");
const requiredColumns = [
  "Source or photographer",
  "Licence",
  "Model release",
  "Date obtained",
  "Approved by",
];

const splitRow = (line) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());

const markdown = await readFile(licensePath, "utf8");
const lines = markdown.split(/\r?\n/);
const headerIndex = lines.findIndex((line) => line.trim().startsWith("| File |"));

if (headerIndex === -1) {
  console.warn("[hero-licenses] No licence table found in LICENSES.md");
  process.exit(0);
}

const headers = splitRow(lines[headerIndex]);
const rows = [];

for (let index = headerIndex + 2; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (!line.startsWith("|")) break;

  const cells = splitRow(line);
  rows.push(
    Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] ?? ""]))
  );
}

const installedFiles = (await readdir(heroDir))
  .filter((file) => file.endsWith(".webp"))
  .sort();
const warnings = [];

for (const file of installedFiles) {
  const row = rows.find((candidate) => candidate.File.replaceAll("`", "") === file);

  if (!row) {
    warnings.push(`${file}: no licence row`);
    continue;
  }

  for (const column of requiredColumns) {
    const value = (row[column] ?? "").trim();

    if (!value || /\b(todo|pending)\b/i.test(value)) {
      warnings.push(`${file}: ${column} is ${value || "empty"}`);
    }
  }
}

for (const row of rows) {
  const file = row.File.replaceAll("`", "").trim();

  if (file && !installedFiles.includes(file)) {
    warnings.push(`${file}: licence row has no installed file`);
  }
}

if (warnings.length > 0) {
  console.warn("[hero-licenses] Confirm before publishing:");
  warnings.forEach((warning) => console.warn(`  - ${warning}`));
}
