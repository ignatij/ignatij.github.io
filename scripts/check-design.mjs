import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";

const output = "/tmp/portfolio-redesign";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const routes = [
  ["/", "home", "Selected writing"],
  ["/projects", "work", "SpotPilot"],
  ["/projects/folio", "folio", "My involvement"],
  ["/projects/quarzo-life", "quarzo", "Technology"],
  ["/projects/j_plus_monitor", "monitor", "33%"],
  ["/blog", "writing", "Arrays"],
  ["/blog/advent-of-go-2025", "article", "Day"],
];
try {
  for (const width of (process.argv.includes("--quick") ? [390] : process.argv.includes("--folio") ? [390, 1440] : [390, 768, 1440])) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    for (const [route, name, expected] of routes.filter(route =>
      process.argv.includes("--folio") ? ["work", "folio"].includes(route[1]) :
        !process.argv.includes("--quick") || route[1] === "article")) {
      await page.goto("http://127.0.0.1:3000" + route, { waitUntil: "networkidle0" });
      await page.waitForFunction(text => document.querySelector("main")?.textContent.includes(text), {}, expected);
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        missingImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
        title: document.querySelector("h1")?.textContent,
        sections: [...document.querySelectorAll("main section")].map(s => s.textContent.length),
      }));
      if (result.overflow || result.missingImages.length || result.sections.includes(0)) throw new Error(JSON.stringify({ route, width, ...result }));
      await page.screenshot({ path: output + "/" + name + "-" + width + ".png", fullPage: true });
      if (name === "article" || name === "quarzo" || name === "work") {
        await page.screenshot({ path: output + "/" + name + "-" + width + "-top.png" });
      }
      console.log(JSON.stringify({ route, width, ...result }));
    }
  }
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle0" });
  await page.keyboard.press("Tab");
  console.log("Keyboard focus", await page.evaluate(() => ({ text: document.activeElement.textContent, outline: getComputedStyle(document.activeElement).outlineStyle })));
  await page.keyboard.press("Enter");
  console.log("Skip link target", await page.evaluate(() => document.activeElement.id));
  await page.click('nav[aria-label="Main navigation"] a[href="/projects"]');
  await page.waitForFunction(() => document.querySelector("h1")?.textContent === "Work");
  await page.waitForSelector('a[href="/projects/spotpilot"]');
  await page.click('a[href="/projects/spotpilot"]');
  await page.waitForFunction(() => document.querySelector("h1")?.textContent === "SpotPilot");
  console.log("Navigation passed");
  await page.hover('nav[aria-label="Main navigation"] a[href="/projects"]');
  console.log("Hover", await page.$eval('nav[aria-label="Main navigation"] a[href="/projects"]', el => getComputedStyle(el).textDecorationLine));
  console.log("PDF", await page.evaluate(async () => {
    const response = await fetch("/Ignatij%20Gichevski%20CV.pdf");
    return { status: response.status, type: response.headers.get("content-type"), signature: (await response.text()).slice(0, 5) };
  }));
  await page.goto("http://127.0.0.1:3000/blog/arrays-vs-linked-lists", { waitUntil: "networkidle0" });
  await page.waitForSelector("pre");
  await page.setViewport({ width: 390, height: 900 });
  const code = await page.$("pre");
  await code.focus();
  await code.screenshot({ path: output + "/code-mobile.png" });
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => document.activeElement.scrollLeft > 0);
  console.log("Code scrolling", await page.evaluate(() => {
    const el = document.activeElement;
    return { tag: el.tagName, outline: getComputedStyle(el).outlineStyle, scrollLeft: el.scrollLeft, overflow: getComputedStyle(el).overflowX };
  }));
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  console.log("Reduced motion", await page.evaluate(() => ({
    enabled: matchMedia("(prefers-reduced-motion: reduce)").matches,
    animation: getComputedStyle(document.querySelector("pre")).animationName,
    transition: getComputedStyle(document.querySelector("pre")).transitionDuration,
  })));
  console.log("Contrast", await page.evaluate(() => {
    const luminance = hex => {
      const channels = hex.match(/../g).map(c => parseInt(c, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    };
    return Object.fromEntries(["f4f4f5", "b4b4bc", "7dd3fc"].map(color => [color, ((luminance(color) + .05) / (luminance("18181b") + .05)).toFixed(2)]));
  }));
  if (errors.length) throw new Error(errors.join("\n"));
} finally {
  await browser.close();
}
