self.onmessage = (event) => {
   const result = run(event.data);
   console.log(result)
   self.postMessage(result);
}

function run(config) {
   const root = { selector: ":root", declarations: [
      ["--hue-1", `${config["hue-1"]}`],
      ["--hue-2", `${config["hue-2"]}`],
      ["--color-1", `hsl(${config["hue-1"]}, 100%, 50%)`],
      ["--color-2", `hsl(${config["hue-2"]}, 100%, 50%)`],
      ["--gradient-angle", `${config["gradient-angle"]}deg`],
      ["--animation-speed", `${config["animation-speed"]}s`]
   ]}
   return {
      rulesets: [root]
   }
}
