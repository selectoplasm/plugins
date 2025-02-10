importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const result = run(event.data)
   self.postMessage(result)
}

function run(config) {
   return {
      designTokens: addTokens(config),
      patternClasses: addPatternClasses(),
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

function addTokens(config) {

   const tokens = []

   categories.forEach(category => {
      tokens.push(createDesignToken(parse(category, "accent"), "light-dark(var(--" + parseShade(category, config['accent-light']) + "), var(--" + parseShade(category, config['accent-dark']) + "))"))
      tokens.push(createDesignToken(parse(category, "background"), "light-dark(var(--" + parseShade(category, config['background-light']) + "), var(--" + parseShade(category, config['background-dark']) + "))"))
      tokens.push(createDesignToken(parse(category, "text"), "light-dark(var(--" + parseShade(category, config['text-light']) + "), var(--" + parseShade(category, config['text-dark']) + "))"))
      tokens.push(createDesignToken(parse(category, "text-invert"), "light-dark(var(--" + parseShade(category, config['text-invert-light']) + "), var(--" + parseShade(category, config['text-invert-dark']) + "))"))
   })
   return tokens

   function parse(category, key) {
      return config.format.replaceAll("$", category).replaceAll("#", key)
   }

   function parseShade(category, shade) {
      return config.format.replaceAll("$", category).replaceAll("#", shade.toString())
   }
}

function addPatternClasses() {
   const classes = []
   categories.forEach(category => {
      classes.push(addPatternClass(`.${category}`, [
         ["--color-accent", `--color-${category}-accent`],
         ["--color-background", `--color-${category}-background`],
         ["--color-text", `--color-${category}-text`],
         ["--color-text-invert", `--color-${category}-text-invert`],
      ]))
   })
   return classes
}

// function createClass(selector, declarations) {
//    let css = `.${selector} {`
//    declarations.forEach(([property, value]) => {
//       css += `${property}: ${value};`
//    })
//    css += `}`
//    return css
// }