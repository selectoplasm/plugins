self.onmessage = (event) => {
   const result = run(event.data);
   self.postMessage(result);
}

const templates = [
   "header nav ul li a",
   "main section article > header, p, footer"
]

function run(_) {
   return {
      templates
   }
}