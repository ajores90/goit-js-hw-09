!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");var n=null;t.addEventListener("click",(function(){if(n)return;n=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));r.style.backgroundColor=t}),1e3),t.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(n),t.removeAttribute("disabled"),e.setAttribute("disabled",!0),n=null})),e.setAttribute("disabled",!0)}();
//# sourceMappingURL=01-color-switcher.791895b3.js.map
