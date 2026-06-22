#!/usr/bin/env node
// Create a new blog post with correct frontmatter.
// Usage:  npm run new:post
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const queue = [];
let pending = null;
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
  if (pending) { const r = pending; pending = null; r(line); }
  else queue.push(line);
});
let closed = false;
rl.on("close", () => { closed = true; if (pending) { const r = pending; pending = null; r(""); } });

function ask(label, def = "") {
  process.stdout.write(def ? `${label} [${def}]: ` : `${label}: `);
  return new Promise((resolve) => {
    const handle = (line) => resolve((line || "").trim() || def);
    if (queue.length) handle(queue.shift());
    else if (closed) handle("");
    else pending = handle;
  });
}

const slugify = (s) =>
  s.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const today = new Date().toISOString().slice(0, 10);

async function main() {
  console.log("\nNew Matrix Forex blog post\n");

  const title = await ask("Title");
  if (!title) { console.log("A title is required. Aborting."); rl.close(); process.exit(1); }

  const defaultSlug = slugify(title);
  const slug = slugify(await ask("URL slug", defaultSlug)) || defaultSlug;
  const category = await ask("Category (e.g. Travel Tips, Remittance, Forex Cards, Rate Trends, ATMs)", "Forex");
  const excerpt = await ask("Excerpt (1-2 sentence summary shown on cards)");
  const author = await ask("Author", "Matrix Forex");
  const cover = await ask("Cover image URL (optional, Enter to skip)", "");

  rl.close();

  const dir = path.join(process.cwd(), "content", "blog");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(file)) {
    console.log(`\nWARNING: ${path.relative(process.cwd(), file)} already exists. Aborting.`);
    process.exit(1);
  }

  const fm = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `date: ${JSON.stringify(today)}`,
    `author: ${JSON.stringify(author)}`,
    `category: ${JSON.stringify(category)}`,
    ...(cover ? [`cover: ${JSON.stringify(cover)}`] : []),
    "---",
    "",
    "Start writing here. You can use **bold**, _italics_, lists, and headings.",
    "",
    "## A section heading",
    "",
    "Your paragraph text goes here.",
    "",
    "> A pull-quote or tip your readers should not miss.",
    "",
  ].join("\n");

  fs.writeFileSync(file, fm, "utf8");
  console.log(`\nCreated ${path.relative(process.cwd(), file)}`);
  console.log(`  Preview:  npm run dev  ->  http://localhost:3000/blog/${slug}`);
  console.log(`  Publish:  git add . && git commit -m "New post: ${title}" && git push\n`);
}

main();
