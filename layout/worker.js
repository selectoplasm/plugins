importScripts("/plugins/sharedScripts.js")

self.onmessage = (_) => {
   const result = run();
   self.postMessage(result);
}

function run() {
   const utilityClasses = []

   utilityClasses.push(createUtilityClass(".flex", "display", `flex`));
   utilityClasses.push(createUtilityClass(".fill-width", "width", "100%"));
   utilityClasses.push(createUtilityClass(".wrap", "flex-wrap", "wrap"));
   utilityClasses.push(createUtilityClass(".grid", "display", `grid`));
   utilityClasses.push(createUtilityClass(".justify-center", "justify-content", "center"));
   utilityClasses.push(createUtilityClass(".items-center", "align-items", "center"));
   utilityClasses.push(createUtilityClass(".text-left", "text-align", "left"));
   utilityClasses.push(createUtilityClass(".text-center", "text-align", "center"));
   utilityClasses.push(createUtilityClass(".text-right", "text-align", "right"));
   utilityClasses.push(createUtilityClass(".vh100", "height", "100vh"));
   utilityClasses.push(createUtilityClass(".vw100", "width", "100vw"));

   return {
      utilityClasses
   }
}