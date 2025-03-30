self.onmessage = (event) => {
   const { data } = event;
   const result = run(data);
   self.postMessage(result);
}

const ruleset = (selector, declarations) => ({ selector, declarations })

const borderFn = (i) => ruleset(`.b${i}`, [["border-width", `${i}px`]])
const borderRadiusFn = (i, initialValue) => ruleset(`.br${i}`, [["border-radius", `${i * initialValue}px`]])

function run(state) {
   const NUM_ITERATIONS = 10
   const rulesets = [
      ruleset(".solid", [["border-style", "solid" ]]),
      ruleset(".dashed", [["border-style", "dashed"]]),
      ruleset(".dotted", [["border-style", "dotted"]]),
      ruleset(".double", [["border-style", "double"]]),
      ruleset(".groove", [["border-style", "groove"]]),
      ruleset(".ridge", [["border-style", "ridge"]]),
      ruleset(".inset", [["border-style", "inset"]]),
      ruleset(".outset", [["border-style", "outset"]]),
   ]
   for (let i = 0; i < NUM_ITERATIONS; i++) {
      rulesets.push(borderFn(i))
      rulesets.push(borderRadiusFn(i, state["initial-value"]))
   }
   return {
      rulesets
   }
}
