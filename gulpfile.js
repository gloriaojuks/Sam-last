const {
  dest,
  series,
  src,
  task,
  watch
} = require("gulp"); /* Path to Tailwind config */
const mainCSS = "src/style.css"; /* Path to main stylesheet */

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}
function build() {
  const atimport = require("postcss-import");
  const postcss = require("gulp-postcss");
  const tailwindcss = require("tailwindcss");
  const purgecss = require("gulp-purgecss");

  return src(mainCSS)
    .pipe(postcss([atimport(), tailwindcss("./tailwind.config.js")]))
    .pipe(
      purgecss({
        content: ["**/*.html"],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ["html"]
          }
        ]
      })
    )
    .pipe(dest("assets/"));
}
task("processStyles", build);
task("watch", () => {
  watch(["**/*.html",'src/*'], build);
});
