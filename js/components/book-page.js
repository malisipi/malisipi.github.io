"use strict";

customElements.define('book-page', class extends HTMLElement {
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
            background: url(assets/page.svg) center;
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

        ::slotted(.title) {
            left: 15%;
            top: 18%;
            width: 70%;
            font-size: min(6dvw, 4dvh);
        }

        ::slotted(.description) {
            left: 15%;
            width: 70%;
            top: 25%;
            font-size: min(4dvw, 3dvh);
        }

        ::slotted(:is(.title, .description):not([multiline])) {
            white-space: nowrap;
            overflow: hidden;
        }

        ::slotted(.preview) {
            left: 15%;
            width: 70%;
            top: 30%;
            height: 40%;
            object-fit: contain;
            --default-view-filter: grayscale(0.4) sepia(0.4);
        }

        ::slotted(.details) {
            left: 15%;
            width: 70%;
            bottom: 20%;
        }
        `;
        
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {
        this.tabIndex = 0;
    }
});