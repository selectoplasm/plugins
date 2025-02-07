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
   const array = [
      createDesignToken("space-0", "0px"),
   ]
   html += `<li class="spacer s0">&nbsp;</li>`;
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

const spacing = (i) => createUtilityClass(".s" + i, "--space", `var(--space-${i})`)
const margin = (i) => createUtilityClass(".m" + i, "margin", `var(--space-${i})`)
const marginX = (i) => createUtilityClass(".mx" + i, "margin-inline", `var(--space-${i})`)
const marginY = (i) => createUtilityClass(".my" + i, "margin-block", `var(--space-${i})`)
const padding = (i) => createUtilityClass(".p" + i, "padding", `var(--space-${i})`)
const paddingX = (i) => createUtilityClass(".px" + i, "padding-inline", `var(--space-${i})`)
const paddingY = (i) => createUtilityClass(".py" + i, "padding-block", `var(--space-${i})`)
const gap = (i) => createUtilityClass(".g" + i, "gap", `var(--space-${i})`)

const fns = [spacing, margin, marginX, marginY, padding, paddingX, paddingY, gap]

function generateUtilityClasses(config) {
   const array = []
   for (let i = 0; i < config["num-iterations"]; i++) {
      fns.forEach(fn => array.push(fn(i)))
   }
   return array
}
