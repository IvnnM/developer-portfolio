import fs from "node:fs";
import path from "node:path";

const root = "out";
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
}
walk(root);

let broken = 0;
let total = 0;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const dir = path.dirname(file);

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let href = m[1];
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("#") ||
      href.startsWith("javascript:")
    )
      continue;
    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    total++;

    let target = href.startsWith("/")
      ? path.join(root, href.slice(1))
      : path.join(dir, href);
    target = path.normalize(target);

    if (fs.existsSync(target)) continue;
    if (fs.existsSync(path.join(target, "index.html"))) continue;
    if (fs.existsSync(target + ".html")) continue;

    console.log(`BROKEN: ${file} -> ${href} (resolved ${target})`);
    broken++;
  }
}

console.log(
  `Checked ${total} internal links across ${files.length} HTML files; ${broken} broken`,
);
process.exit(broken ? 1 : 0);
