self.onmessage = (event) => {
   const config = event.data;
   const result = run(config);
   self.postMessage(result);
};

function run(config) {
   let string = "";
   if (config["box-sizing-border-box"]) string += "* { box-sizing: border-box; }\n\n";
   if (config["body-margin-0"]) string += "body { margin: 0; }\n\n";
   if (config["ul-padding-inline-start-0"]) string += "ul { padding-inline-start: 0; }\n\n";
   if (config["li-list-style-none"]) string += "li { list-style: none; }\n\n";
   return { css: string.trim() }   ;
}
