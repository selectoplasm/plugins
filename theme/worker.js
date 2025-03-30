self.onmessage = (event) => {
   const result = run(event.data)
   self.postMessage(result)
}

const ruleset = (selector, declarations) => ({ selector, declarations })

function run(config) {
   const rulesets = generateRulesets()
   rulesets.push(generateTokens(config))
   return {
      rulesets,
      html: generateHtml(),
      css: `.light { background: var(--color-neutral-0); }, .dark { background: var(--color-neutral-900); }`
   }
}

const categories = ["neutral", "success", "warning", "error", "primary"]

function generateHtml() {
   let html = '<section id="theme-preview"><div class="light">'
   const categories = ["neutral", "success", "warning", "error", "primary"]
   categories.forEach(category => {
      html += `<article class="${category}"><header>${category}</header><p>${category} content</p><footer><button class="outline">Cancel</button><button>Confirm</button></footer></article>`
   })
   html += `</div><div class="dark">`
   categories.forEach(category => {
      html += `<article class="${category}"><header>${category}</header><p>${category} content</p><footer><button class="outline">Cancel</button><button>Confirm</button></footer></article>`
   })
   html += `</div></section>`
   return html
}

function generateTokens(config) {

   const tokens = []

   categories.forEach(category => {
      tokens.push([parse(category, "accent"), "light-dark(var(--" + parseShade(category, config['accent-light']) + "), var(--" + parseShade(category, config['accent-dark']) + "))"])
      tokens.push([parse(category, "background"), "light-dark(var(--" + parseShade(category, config['background-light']) + "), var(--" + parseShade(category, config['background-dark']) + "))"])
      tokens.push([parse(category, "text"), "light-dark(var(--" + parseShade(category, config['text-light']) + "), var(--" + parseShade(category, config['text-dark']) + "))"])
      tokens.push([parse(category, "text-invert"), "light-dark(var(--" + parseShade(category, config['text-invert-light']) + "), var(--" + parseShade(category, config['text-invert-dark']) + "))"])
   })
   const root = createRuleset(":root", tokens)
   return root

   function parse(category, key) {
      return "--" + config.format.replaceAll("$", category).replaceAll("#", key)
   }

   function parseShade(category, shade) {
      return config.format.replaceAll("$", category).replaceAll("#", shade.toString())
   }
}

function generateRulesets() {
   const rulesets = []
   categories.forEach(category => {
      rulesets.push(ruleset(`.${category}`, [
         ["--color-accent", `--color-${category}-accent`],
         ["--color-background", `--color-${category}-background`],
         ["--color-text", `--color-${category}-text`],
         ["--color-text-invert", `--color-${category}-text-invert`],
      ]))
   })
   rulesets.push(ruleset(`.theme-standard`, [
      ["border-color", "--color-accent"],
      ["background-color", "--color-background"],
      ["color", "--color-text"]
   ]))
   return rulesets
}
