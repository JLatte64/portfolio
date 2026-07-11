import fs from "node:fs";
import path from "node:path";

const src = path.resolve("build/client/index.html");
const dest = path.resolve("build/client/404.html");

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(
      "Successfully created cross-platform 404.html deployment fallback!",
    );
  }
} catch (err) {
  console.error("Error duplicating build fallback:", err);
}
