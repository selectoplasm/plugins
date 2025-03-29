importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const { data } = event;
   const result = run(data);
   console.log(result)
   self.postMessage(result);
}

const borderFn = (i) => createRuleset(`.b${i}`, [["border-width", `${i}px`]])
const borderRadiusFn = (i, initialValue) => createRuleset(`.br${i}`, [["border-radius", `${i * initialValue}px`]])

function run(state) {
   const NUM_ITERATIONS = 10
   const rulesets = [
      createRuleset(".solid", [["border-style", "solid" ]]),
      createRuleset(".dashed", [["border-style", "dashed"]]),
      createRuleset(".dotted", [["border-style", "dotted"]]),
      createRuleset(".double", [["border-style", "double"]]),
      createRuleset(".groove", [["border-style", "groove"]]),
      createRuleset(".ridge", [["border-style", "ridge"]]),
      createRuleset(".inset", [["border-style", "inset"]]),
      createRuleset(".outset", [["border-style", "outset"]]),
   ]
   for (let i = 0; i < NUM_ITERATIONS; i++) {
      rulesets.push(borderFn(i))
      rulesets.push(borderRadiusFn(i, state["initial-value"]))
   }
   return {
      rulesets
   }
}
