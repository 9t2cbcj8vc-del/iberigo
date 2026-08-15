const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "app.js");
const marker = "/* IberiGo roadmap bundle globals */";

const prelude = `${marker}
var linkLabels = window.linkLabels || (window.linkLabels = { en: {}, es: {} });
var urls = window.urls || (window.urls = {});
var govMeta = window.govMeta || (window.govMeta = {});
`;

let app = fs.readFileSync(appPath, "utf8");
if (!app.includes(marker)) {
  app = `${prelude}\n${app}`;
  fs.writeFileSync(appPath, app);
}
