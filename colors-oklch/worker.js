self.onmessage = (event) => {
   const result = run(event.data)
   self.postMessage(result)
}

function run(config) {
   let htmlString = ""
   const tokensArray = []
   const colors = config['generated-colors']

   const { html, tokens } = generateHtmlAndTokens("neutral", -1, config)
   htmlString += html
   tokensArray.push(...tokens)

   for (const color of colors) {
      const { html, tokens } = generateHtmlAndTokens(color.name, color.hue, config)
      htmlString += html
      tokensArray.push(...tokens)
   }

   return {
      css: generateCss(config["l-threshold"]),
      html: htmlString,
      rulesets: [{ selector: ':root', declarations: tokensArray }]
   }
}

function generateCss(lThreshold) {
   let string = `:root {\n\t--l-threshold: ${lThreshold};\n}`
   // string += `*[style*="--color"] {\n\t--l: clamp(0, (var(--l-threshold) / l - 1) * infinity, 1);\n\t--readable-color: oklch(from var(--color) var(--l) 0 h);\n}`
   return string.trim()
}

function generateHtmlAndTokens(name, hue, { center, width, steepness, midpoint, ['max-chroma']: maxChroma }) {
   const tokens = []
   let html = "<section style='display: flex; height: 15%;'>"
   for (let i = 0; i < 10; i++) {
      const lightness = lightnessCurve(i)
      const chroma = hue === -1 ? 0 : chromaCurve(i) // neutral sends hue as -1
      const color = `oklch(${lightness}% ${chroma} ${hue})`
      tokens.push([`--color-${name.toLowerCase()}-${i * 100}`, color])
      html += `<div style='flex-grow: 1; --color-string: var(--color-${name}-${i * 100}); background-color: var(--color-string); color: var(--readable-color);'>${i * 100}</div>`
   }
   html += `</section>`
   return { html, tokens }


   function chromaCurve(x) {
      return maxChroma * Math.exp(-Math.pow((x - center) / width, 2))
   }

   function lightnessCurve(x) {
      const minLightness = 0
      const maxLightness = 100
      const range = maxLightness - minLightness

      return maxLightness - range / (1 + Math.exp(-steepness * (x - midpoint)))
   }
}
