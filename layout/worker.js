importScripts("/plugins/sharedScripts.js")

self.onmessage = (_) => {
   const result = run();
   self.postMessage(result);
}

function run() {
   const utilityClasses = []

   utilityClasses.push(createUtilityClass(".flex", [{ property: "display", value: "flex" }]));
   utilityClasses.push(createUtilityClass(".fill-width", [{ property: "width", value: "100%" }]));
   utilityClasses.push(createUtilityClass(".wrap", [{ property: "flex-wrap", value: "wrap" }]));
   utilityClasses.push(createUtilityClass(".grid", [{ property: "display", value: "grid" }]));
   utilityClasses.push(createUtilityClass(".justify-center", [{ property: "justify-content", value: "center" }]));
   utilityClasses.push(createUtilityClass(".items-center", [{ property: "align-items", value: "center" }]));
   utilityClasses.push(createUtilityClass(".text-left", [{ property: "text-align", value: "left" }]));
   utilityClasses.push(createUtilityClass(".text-center", [{ property: "text-align", value: "center" }]));
   utilityClasses.push(createUtilityClass(".text-right", [{ property: "text-align", value: "right" }]));
   utilityClasses.push(createUtilityClass(".vh100", [{ property: "height", value: "100vh" }]));
   utilityClasses.push(createUtilityClass(".vw100", [{ property: "width", value: "100vw" }]));
   utilityClasses.push(createUtilityClass(".font-big", [{ property: "font-size", value: "2rem" }]));

   return {
      utilityClasses
   }
}
