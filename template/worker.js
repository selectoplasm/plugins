self.onmessage = (event) => {
   const result = run(event.data);
   self.postMessage(result);
}

function run(config) {
   return {
      templates
   }
}
