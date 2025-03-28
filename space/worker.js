importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const config = event.data;
   const result = run(config);
   self.postMessage(result);
}

function run(config) {
   const { html, root } = generateTokensAndHtml(config)
   return {
      html,
      rulesets: [root, ...generateRulesets(config)]
   }
}

function generateTokensAndHtml(config) {
   let html = `<section id="spacing"><ul class="spacing">`;
   let a = parseInt(config["step-of-step"])
   let b = parseInt(config["step"])
   let c = parseInt(config["initial-value"])
   const declarations = []
   for (let i = 0; i < config["num-iterations"]; i++) {
      declarations.push([`--space-${i}`, `${c}px`])
      html += `<li class="spacer s${i}">&nbsp;</li>`;
      c += b
      b += a
   }
   html += `</ul></section>`;
   const root = createRuleset(':root', declarations)
   return { html, root }
}

const spacing = (i) => createRuleset(".s" + i, [["--space", `--space-${i}`]])
const margin = (i) => createRuleset(".m" + i, [["margin", `--space-${i}`]])
const marginX = (i) => createRuleset(".mx" + i, [["margin-left", `--space-${i}`], ["margin-right", `--space-${i}`]])
const marginY = (i) => createRuleset(".my" + i, [["margin-top", `--space-${i}`], ["margin-bottom", `--space-${i}`]])
const padding = (i) => createRuleset(".p" + i, [["padding", `--space-${i}`]])
const paddingX = (i) => createRuleset(".px" + i, [["padding-left", `--space-${i}`], ["padding-right", `--space-${i}`]])
const paddingY = (i) => createRuleset(".py" + i, [["padding-top", `--space-${i}`], ["padding-bottom", `--space-${i}`]])
const gap = (i) => createRuleset(".g" + i, [["gap", `--space-${i}`]])

const fns = [spacing, margin, marginX, marginY, padding, paddingX, paddingY, gap]

function generateRulesets(config) {
   const array = []
   for (let i = 0; i < config["num-iterations"]; i++) {
      fns.forEach(fn => array.push(fn(i)))
   }
   return array
}
