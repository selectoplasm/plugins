importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const { data } = event;
   const result = run(data);
   self.postMessage(result);
}

const borderFn = (i) => createUtilityClass(`.b${i}`, [{ property: "border-width", value: `${i}px` }])
const borderRadiusFn = (i, initialValue) => createUtilityClass(`.br${i}`, [{ property: "border-radius", value: `${i * initialValue}px` }])

function run(state) {
   const NUM_ITERATIONS = 10
   const utilityClasses = [
      createUtilityClass(".solid", [{ property: "border-style", value: "solid" }]),
      createUtilityClass(".dashed", [{ property: "border-style", value: "dashed" }]),
      createUtilityClass(".dotted", [{ property: "border-style", value: "dotted" }]),
      createUtilityClass(".double", [{ property: "border-style", value: "double" }]),
      createUtilityClass(".groove", [{ property: "border-style", value: "groove" }]),
      createUtilityClass(".ridge", [{ property: "border-style", value: "ridge" }]),
      createUtilityClass(".inset", [{ property: "border-style", value: "inset" }]),
      createUtilityClass(".outset", [{ property: "border-style", value: "outset" }]),
   ]
   for (let i = 0; i < NUM_ITERATIONS; i++) {
      utilityClasses.push(borderFn(i))
      utilityClasses.push(borderRadiusFn(i, state["initial-value"]))
   }
   return {
      utilityClasses
   }
}
