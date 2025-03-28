importScripts("/plugins/sharedScripts.js")

self.onmessage = (_) => {
   const result = run();
   self.postMessage(result);
}

function run() {
   const rulesets = []

   rulesets.push(createRuleset(".flex", [["display", "flex"]]));
   rulesets.push(createRuleset(".fill-width", [["width", "100%"]]));
   rulesets.push(createRuleset(".wrap", [["flex-wrap", "wrap"]]));
   rulesets.push(createRuleset(".grid", [["display", "grid"]]));
   rulesets.push(createRuleset(".justify-center", [["justify-content", "center"]]));
   rulesets.push(createRuleset(".items-center", [["align-items", "center"]]));
   rulesets.push(createRuleset(".text-left", [["text-align", "left"]]));
   rulesets.push(createRuleset(".text-center", [["text-align", "center"]]));
   rulesets.push(createRuleset(".text-right", [["text-align", "right"]]));
   rulesets.push(createRuleset(".vh100", [["height", "100vh"]]));
   rulesets.push(createRuleset(".vw100", [["width", "100vw"]]));
   rulesets.push(createRuleset(".font-big", [["font-size", "2rem"]]));

   return {
      rulesets
   }
}
