"use strict";

customElements.define('wolf-claw', class extends HTMLElement {
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
            width: 200px;
            height: 200px;
            background: url(assets/claw.svg) center;
            background-size: 100% 100%;
        }

        .root {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            padding: 25px;
            box-sizing: border-box;
        }

        ::slotted([button]) {
            --icon-size: min(3dvw, 2dvh);
            position: absolute;
        }

        ::slotted([button="1"]) {
            left: 14%;
            top: 43%;
            transform: rotate(-40deg);
        }

        ::slotted([button="2"]) {
            left: 35%;
            top: 20%;
            transform: rotate(-20deg);
        }

        ::slotted([button="3"]) {
            right: 35%;
            top: 20%;
            transform: rotate(20deg);
        }

        ::slotted([button="4"]) {
            right: 14%;
            top: 43%;
            transform: rotate(40deg);
        }

        ::slotted([button="5"]) {
            left: calc(50% - 10px);
            top: 45%;
        }

        ::slotted([button="6"]) {
            left: 35%;
            top: 58%;
            transform: rotate(-10deg);
        }

        ::slotted([button="7"]) {
            right: 35%;
            top: 58%;
            transform: rotate(10deg);
        }

        ::slotted(.owner) {
            position: absolute;
            color: white;
            bottom: 5px;
            left: 50%;
            transform: translate(-50%, 0);
        }
        `;
        
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {
        this.tabIndex = 0;
    }
});