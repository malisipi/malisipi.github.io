"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("book-page").forEach((element, index) => {
        element.style.setProperty("--page-index", index);
        element.style.setProperty("--page-random", (-2*(index%2)+1)*Math.random());
        if(index%2) element.querySelector("wolf-claw")?.setAttribute("right", true);
        element.addEventListener("click", (event, __element= element) => {
            window.history.pushState({"pageTitle":element.querySelector(".title").innerText}, "", location.href.replace(location.hash, "") + "#" + element.id);
        })
    });
});

customElements.define('the-book', class extends HTMLElement {
    #root;

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.#root = document.createElement("div");
        this.#root.className = "root";

        this.#root.append(document.createElement('slot'));
        this.shadowRoot.append(this.#root);

        let style = document.createElement("style");

        style.textContent = `
        :host {
            position: relative;
            display: block;
            aspect-ratio: 4/5;
            background: url(assets/book.svg) center;
            background-size: 100% 100%;
        }

        .root {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }

        ::slotted(*) {
            position: absolute;
            font-weight: normal;
            text-align: center;
            margin: 0;
            color: #000a;
        }

        ::slotted(.name) {
            left: 30%;
            width: 50%;
            top: 28%;
            font-size: min(6dvw, 4dvh);
        }

        ::slotted(.description) {
            left: 30%;
            width: 50%;
            bottom: 20%;
            font-size: min(4dvw, 3dvh);
        }
        `;
        
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {
        this.tabIndex = 0;
    }
});