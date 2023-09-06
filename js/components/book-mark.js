"use strict";

customElements.define('book-mark', class extends HTMLElement {
    #root;
    #root_child;

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.#root = document.createElement("div");
        this.#root.className = "root";

        this.#root_child = document.createElement("div");
        this.#root_child.className = "root-child";

        this.#root_child.append(document.createElement('slot'));
        this.#root.append(this.#root_child);
        this.shadowRoot.append(this.#root);

        let style = document.createElement("style");

        style.textContent = `
        :host::before {
            position: absolute;
            content: var(--book-mark-extra);
            top: 7dvh;
            width: 8dvh;
            height: 5.25dvh;
            left: 0;
            background: #996666;
        }

        :host::after {
            position: absolute;
            content: var(--book-mark-extra);
            top: 8dvh;
            width: 20px;
            height: 20px;
            left: 8dvh;
            background: radial-gradient(circle at bottom right, transparent 20px, #996666 0);
        }

        .root {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: left;
            align-items: center;
            overflow-x: auto;
        }

        .root-child {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            gap: 2dvw;
            text-wrap: nowrap;
            margin: 0 4dvw;
        }

        ::slotted(a) {
            color: white;
            text-decoration: none;
        }

        ::slotted(a.skip-to-content:not(:focus)) {
            position:fixed;
            top: -32000px;
            left: -32000px;
        }
        `;
        
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {}
});
