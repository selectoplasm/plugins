self.onmessage = (_) => {
   const result = run();
   self.postMessage(result);
}

const ruleset = (selector, declarations) => ({ selector, declarations })

function run() {
   const rulesets = []
   rulesets.push(ruleset(".flex", [["display", "flex"]]));
   rulesets.push(ruleset(".fill-width", [["width", "100%"]]));
   rulesets.push(ruleset(".wrap", [["flex-wrap", "wrap"]]));
   rulesets.push(ruleset(".grid", [["display", "grid"]]));
   rulesets.push(ruleset(".justify-center", [["justify-content", "center"]]));
   rulesets.push(ruleset(".items-center", [["align-items", "center"]]));
   rulesets.push(ruleset(".text-left", [["text-align", "left"]]));
   rulesets.push(ruleset(".text-center", [["text-align", "center"]]));
   rulesets.push(ruleset(".text-right", [["text-align", "right"]]));
   rulesets.push(ruleset(".vh100", [["height", "100vh"]]));
   rulesets.push(ruleset(".vw100", [["width", "100vw"]]));
   rulesets.push(ruleset(".font-big", [["font-size", "2rem"]]));

   return {
      rulesets
   }
}
