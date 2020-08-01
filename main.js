console.log("Preparing runner...");

input = document.getElementById("input");
output = document.getElementById("output");

const lastSource = localStorage.getItem("src");
if (lastSource) input.innerText = lastSource;

document.querySelectorAll('code').forEach((block) => {
  originalLog('Highlight auto');
  hljs.highlightAuto(block);
});

input.onkeyup = function () {
  localStorage.setItem("src", input.innerText);
  
  document.querySelectorAll('code').forEach((block) => {
    originalLog('Update block 3');
    // hljs.highlightBlock(block);
  });
}

const add = something => {
  originalLog('PRINT', something);
  output.innerHTML = output.innerHTML + '<br/>' + something;
}
const originalError = console.error;
const originalLog = console.log;
const originalWarning = console.warn;
const originalInfo = console.info;
const originalClear = console.clear;

console.error = function(error) {
  add(error.toString() + error.stack);
  originalError.apply(console, arguments);
};
console.log = function(...args) {
  args.forEach(add);
  originalLog.apply(console, args);
};
console.warn = function(...args) {
  args.forEach(add);
  originalWarning.apply(console, args);
};
console.info = function(...args) {
  args.forEach(add);
  originalInfo.apply(console, args);
};
console.clear = function(...args) {
  element.innerHTML = '';
  originalClear.apply(console, args);
};

document.getElementById("button-run").onclick = function run() {
  output.innerHTML = '';
  eval(input.innerText)
}
