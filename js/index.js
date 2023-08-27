"use strict";

document.body.addEventListener("wheel", event => {
    if(window.innerHeight/window.innerWidth > 3/4) return;
    if(document.body.hasAttribute("dialog_open")) return;
    document.body.scrollBy(event.deltaY,0);
});

document.body.addEventListener("scroll", event => {
    if(window.innerHeight/window.innerWidth > 3/4) {
        document.body.scrollBy(-32000, 0);
    } else {
        document.body.scrollBy(0, -32000);
    }
});