"use strict";

customElements.define('social-media',

class extends HTMLElement {
    #icons = {
        github: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-github' viewBox='0 0 16 16'%3E%3Cpath d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z'/%3E%3C/svg%3E",
        mail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-envelope-paper' viewBox='0 0 16 16'%3E%3Cpath d='M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z'/%3E%3C/svg%3E"
    }
    #github;
    #mail;

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        let root = document.createElement("div");
        root.className = "root";

        this.#github = document.createElement("a");
        this.#github.setAttribute("aria-label", "Open Github");
        this.#github.className = "icon";
        let github_icon = document.createElement("img");
        github_icon.src = this.#icons.github;
        github_icon.className = "icon";
        github_icon.alt = "github";
        this.#github.append(github_icon);
        root.append(this.#github);

        this.#mail = document.createElement("a");
        this.#mail.setAttribute("aria-label", "Send a Mail");
        this.#mail.className = "icon";
        let mail_icon = document.createElement("img");
        mail_icon.src = this.#icons.mail;
        mail_icon.className = "icon";
        mail_icon.alt = "mail";
        this.#mail.append(mail_icon);
        root.append(this.#mail);

        this.shadowRoot.append(root);

        let style = document.createElement("style");

        style.textContent = `
        :host {
            position: relative;
            display: block;
            width: 90%;
            left: 5%;
            height: 36px;
            border-radius: 15px;
        }

        .root {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            column-gap: 8px;
        }

        .icon {
            width: 36px;
            height: 36px;
        }

        [special-title]::before {
            transition: all 0.1s ease 0.3s;
            content: attr(special-title);
            background: #dddddd;
            font-size: 14px;
            position: absolute;
            transform: translate(calc(-50% + 12.5px), -26px);
            text-align:center;
            color: #222222;
            border-radius: 8px;
            visibility: hidden;
            white-space: nowrap;
            display: none;
            opacity: 0;
            padding: 2px 8px;
            text-transform: capitalize;
        }

        [special-title][special-title-pos="bottom"]::before {
            transform: translate(calc(-50% + 12.5px), 30px);
        }

        [special-title]:is(:hover, :focus)::before {
            opacity: 1;
            visibility: visible;
            display: unset;
        }
        `;
        
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {
        if(this.hasAttribute("github")) {
            this.#github.href = this.getAttribute("github");
        } else {
            this.#github.hidden = true;
        }
        if(this.hasAttribute("mail")) {
            this.#mail.href = this.getAttribute("mail");
        } else {
            this.#mail.hidden = true;
        }
    }
}

);
