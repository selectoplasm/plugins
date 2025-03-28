importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const result = run(event.data);
   self.postMessage(result);
}

const typeScales = ["minor-second", "major-second", "minor-third", "major-third", "perfect-fourth", "augmented-fourth", "perfect-fifth"];

function run(config) {
   const declarations = []
   const typeScaleIndex = config["type-scale"]
   declarations.push(["--type-scale", "var(--" + typeScales[typeScaleIndex] + ")"])
   return {
      rulesets: [createRuleset(":root", declarations)]
   }
}
