"use strict";

customElements.define('img-viewer', class extends HTMLElement {
    #root;
    #slot;
    #slot_img = null;
    #dialog;

    #open_dialog () {
        document.body.setAttribute("dialog_open", true);
        this.#dialog = document.createElement("dialog");
        document.body.append(this.#dialog);
        this.#dialog.open = true;
        this.#dialog.tabIndex = 1;
        this.#dialog.style.position = "fixed";
        this.#dialog.style.left = "10dvw";
        this.#dialog.style.width = "80dvw";
        this.#dialog.style.top = "10dvh";
        this.#dialog.style.height = "80dvh";
        this.#dialog.style.background = "#E1E1C2";
        this.#dialog.style.padding = "0";
        this.#dialog.style.margin = "0";
        this.#dialog.style.display = "flex";
        this.#dialog.style.alignItems = "center";
        this.#dialog.style.justifyContent = "center";
        this.#dialog.style.borderRadius = "5px";
        this.#dialog.style.border = "none";
        this.#dialog.style.zIndex = "99";
        this.#dialog.focus();

        let img = this.#slot_img.cloneNode();
        this.#dialog.append(img);
        img.style.objectFit = "contain";
        img.style.width = "75dvw";
        img.style.height = "75dvh";
         
        let keyboard_blocker = new AbortController();
        document.addEventListener("keydown", (e, cb = close_button) => {
            if(e.key=="Escape"){
                cb.click();
            } else {
                e.preventDefault();
            }
        }, {signal: keyboard_blocker.signal});

        let close_button = document.createElement("app-icon");
        close_button.setAttribute("code", "bootstrap/close");
        close_button.innerText = "Close";
        close_button.style.position = "fixed";
        close_button.style.top = "calc(10dvh + 12px)";
        close_button.style.right = "calc(10dvw + 12px)";
        close_button.addEventListener("click", (e, __keyboard_blocker=keyboard_blocker) => {
            document.body.removeAttribute("dialog_open");
            __keyboard_blocker.abort();
            this.#dialog.remove();
        });
        this.#dialog.append(close_button);
        close_button.render();
        let close_button_img = close_button.querySelector("img");
        close_button_img.style.width = "36px";
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.#root = document.createElement("div");
        this.#root.className = "root";
        
        this.#slot = document.createElement('slot');
        this.#slot.addEventListener("slotchange", e => {
            if(this.#slot_img != null) return;
            this.#slot_img = this.#slot.assignedNodes().filter(e=>e.tagName?.toLowerCase()=="img")[0];
            this.#slot_img.setAttribute("loading", "lazy");
        });

        this.#root.addEventListener("click", () => { this.#open_dialog(); });

        this.#root.append(this.#slot);
        this.shadowRoot.append(this.#root);

        let style = document.createElement("style");

        style.textContent = `
        :host {
            position: relative;
            display: block;
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

        ::slotted(img) {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: var(--default-view-filter);
        }
        `;
        
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {
        this.tabIndex = 0;
        this.addEventListener("keydown", e => {
            if(e.key == "Enter" || e.key == " ") {
                this.#open_dialog();
            }
        })
    }
});
