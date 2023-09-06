"use strict";

document.addEventListener("DOMContentLoaded", async () => {
    document.querySelectorAll("app-icon").forEach(tag => tag.render());
});

customElements.define('app-icon', class extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        this.dispatchEvent(new CustomEvent("load_icon"));
    }

    connectedCallback() {
        this.addEventListener("load_icon", event => {
            let picture = document.createElement("picture");
            let icon = document.createElement("img");
            icon.setAttribute("loading", "lazy");
            picture.append(icon)
            if(!this.hasAttribute("tip")) picture.setAttribute("tip", this.innerText);
            icon.setAttribute("alt", this.innerText);
            icon.setAttribute("aria-label", this.innerText);
            icon.setAttribute("draggable", false);
            icon.src = "./assets/icons/" + this.getAttribute("code") + ".svg";
            icon.style.setProperty("width", "var(--icon-size)");
            if(!this.hasAttribute("notabindex")){
                picture.tabIndex = 0;
            }
            if(!this.hasAttribute("inject")){
                this.innerText = "";
                this.append(picture);
            } else {
                this.insertAdjacentElement("afterbegin", picture);
            };
            if(this.hasAttribute("pre-tip")){
                picture.setAttribute("pre-tip", this.getAttribute("pre-tip"));
                this.removeAttribute("pre-tip");
            }
        })
    }
});
