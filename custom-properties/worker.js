self.onmessage = (event) => {
   const result = run(event.data);
   self.postMessage(result);
}

const ruleset = (selector, declarations) => ({ selector, declarations })

function run(config) {
   console.log(config)
   const root = ruleset('root', config["custom-properties"].map(({property, value}) => [property, value]))
   return { rulesets: [root]}
}
