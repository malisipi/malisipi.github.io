"use strict";

window.___app_localization = {};

document.addEventListener("DOMContentLoaded", async () => {
    let meta_variants = document.head.querySelector(`meta[name="available-variants"]`);
    let variants = meta_variants.getAttribute("content").split(",");
    ___app_localization.browser_language = navigator.language.split("-")[0].toLowerCase();

    if(___app_localization.browser_language == "en") return;
    if(!variants.includes(___app_localization.browser_language)) return;
    document.querySelector("html").setAttribute("lang", ___app_localization.browser_language);

    ___app_localization.language_pack = await new Promise(async (resolve) => {
        let response = await fetch("langs/" + ___app_localization.browser_language + ".json");
        resolve(JSON.parse(await response.text()));
    });

    document.querySelectorAll("app-localization").forEach(tag => {
        let code = tag.getAttribute("code");
        let translated = ___app_localization.language_pack[code];
        if(!translated){
            console.warn(`<app-localization>: "${code}" code is not defined in "${___app_localization.browser_language}" language pack`)
            return;
        }
        tag.dispatchEvent(
            new CustomEvent("load_variant", {
                detail: translated
            })
        );
    });
});

customElements.define('app-localization', class extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.addEventListener("load_variant", event => {
            this.innerText = event.detail;
        });
    }
});