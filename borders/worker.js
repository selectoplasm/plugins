importScripts("/plugins/sharedScripts.js")

self.onmessage = (event) => {
   const { data } = event;
   const result = run(data);
   self.postMessage(result);
}

const borderFn = (i) => createUtilityClass(`.b${i}`, "border-width", `${i}px`)
const borderRadiusFn = (i, initialValue) => createUtilityClass(`.br${i}`, "border-radius", `${i * initialValue}px`)

function run(state) {
   const NUM_ITERATIONS = 10
   const utilityClasses = [
      createUtilityClass(".solid", "border-style", "solid"),
      createUtilityClass(".dashed", "border-style", "dashed"),
      createUtilityClass(".dotted", "border-style", "dotted"),
      createUtilityClass(".double", "border-style", "double"),
      createUtilityClass(".groove", "border-style", "groove"),
      createUtilityClass(".ridge", "border-style", "ridge"),
      createUtilityClass(".inset", "border-style", "inset"),
      createUtilityClass(".outset", "border-style", "outset"),
   ]
   for (let i = 0; i < NUM_ITERATIONS; i++) {
      utilityClasses.push(borderFn(i))
      utilityClasses.push(borderRadiusFn(i, state["initial-value"]))
   }
   return {
      utilityClasses
   }
}