importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const config = event.data;
   const result = run(config);
   self.postMessage(result);
}

function run(config) {
   const { html, designTokens } = generateTokens(config)
   return {
      html,
      designTokens,
      utilityClasses: generateUtilityClasses(config)
   }
}

function generateTokens(config) {
   let html = `<section id="spacing"><ul class="spacing">`;
   const array = []
   let a = parseInt(config["step-of-step"])
   let b = parseInt(config["step"])
   let c = parseInt(config["initial-value"])
   for (let i = 0; i < config["num-iterations"]; i++) {
      array.push(createDesignToken(`space-${i}`, `${c}px`))
      html += `<li class="spacer s${i}">&nbsp;</li>`;
      c += b
      b += a
   }
   html += `</ul></section>`;
   return { html, designTokens: array }
}

const spacing = (i) => createUtilityClass(".s" + i, [{ property: "--space", value: `--space-${i}` }])
const margin = (i) => createUtilityClass(".m" + i, [{ property: "margin", value: `--space-${i}` }])
const marginX = (i) => createUtilityClass(".mx" + i, [{ property: "margin-left", value: `--space-${i}` }, { property: "margin-right", value: `--space-${i}` }])
const marginY = (i) => createUtilityClass(".my" + i, [{ property: "margin-top", value: `--space-${i}` }, { property: "margin-bottom", value: `--space-${i}` }])
const padding = (i) => createUtilityClass(".p" + i, [{ property: "padding", value: `--space-${i}` }])
const paddingX = (i) => createUtilityClass(".px" + i, [{ property: "padding-left", value: `--space-${i}` }, { property: "padding-right", value: `--space-${i}` }])
const paddingY = (i) => createUtilityClass(".py" + i, [{ property: "padding-top", value: `--space-${i}` }, { property: "padding-bottom", value: `--space-${i}` }])
const gap = (i) => createUtilityClass(".g" + i, [{ property: "gap", value: `--space-${i}` }])

const fns = [spacing, margin, marginX, marginY, padding, paddingX, paddingY, gap]

function generateUtilityClasses(config) {
   const array = []
   for (let i = 0; i < config["num-iterations"]; i++) {
      fns.forEach(fn => array.push(fn(i)))
   }
   return array
}
