"use strict";

customElements.define('project-preview',

class extends HTMLElement {
    #icons = {
        stars:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-star' viewBox='0 0 16 16'%3E%3Cpath d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'/%3E%3C/svg%3E",
        forks:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-diagram-2' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z'/%3E%3C/svg%3E",
        source:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-git' viewBox='0 0 16 16'%3E%3Cpath d='M15.698 7.287 8.712.302a1.03 1.03 0 0 0-1.457 0l-1.45 1.45 1.84 1.84a1.223 1.223 0 0 1 1.55 1.56l1.773 1.774a1.224 1.224 0 0 1 1.267 2.025 1.226 1.226 0 0 1-2.002-1.334L8.58 5.963v4.353a1.226 1.226 0 1 1-1.008-.036V5.887a1.226 1.226 0 0 1-.666-1.608L5.093 2.465l-4.79 4.79a1.03 1.03 0 0 0 0 1.457l6.986 6.986a1.03 1.03 0 0 0 1.457 0l6.953-6.953a1.031 1.031 0 0 0 0-1.457'/%3E%3C/svg%3E",
        demo:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-arrow-up-right-square' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z'/%3E%3C/svg%3E",
        license:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-pen' viewBox='0 0 16 16'%3E%3Cpath d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'/%3E%3C/svg%3E",
        close:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-x' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E",
        mention:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-newspaper' viewBox='0 0 16 16'%3E%3Cpath d='M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z'/%3E%3Cpath d='M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z'/%3E%3C/svg%3E",
        platforms: {
            android:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-android' viewBox='0 0 16 16'%3E%3Cpath d='M2.76 3.061a.5.5 0 0 1 .679.2l1.283 2.352A8.94 8.94 0 0 1 8 5a8.94 8.94 0 0 1 3.278.613l1.283-2.352a.5.5 0 1 1 .878.478l-1.252 2.295C14.475 7.266 16 9.477 16 12H0c0-2.523 1.525-4.734 3.813-5.966L2.56 3.74a.5.5 0 0 1 .2-.678ZM5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'/%3E%3C/svg%3E",
            web:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-browser-chrome' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'/%3E%3C/svg%3E",
            linux:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-ubuntu' viewBox='0 0 16 16'%3E%3Cpath d='M2.273 9.53a2.273 2.273 0 1 0 0-4.546 2.273 2.273 0 0 0 0 4.547Zm9.467-4.984a2.273 2.273 0 1 0 0-4.546 2.273 2.273 0 0 0 0 4.546ZM7.4 13.108a5.535 5.535 0 0 1-3.775-2.88 3.273 3.273 0 0 1-1.944.24 7.4 7.4 0 0 0 5.328 4.465c.53.113 1.072.169 1.614.166a3.253 3.253 0 0 1-.666-1.9 5.639 5.639 0 0 1-.557-.091Zm3.828 2.285a2.273 2.273 0 1 0 0-4.546 2.273 2.273 0 0 0 0 4.546Zm3.163-3.108a7.436 7.436 0 0 0 .373-8.726 3.276 3.276 0 0 1-1.278 1.498 5.573 5.573 0 0 1-.183 5.535 3.26 3.26 0 0 1 1.088 1.693ZM2.098 3.998a3.28 3.28 0 0 1 1.897.486 5.544 5.544 0 0 1 4.464-2.388c.037-.67.277-1.313.69-1.843a7.472 7.472 0 0 0-7.051 3.745Z'/%3E%3C/svg%3E",
            windows:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' class='bi bi-microsoft' viewBox='0 0 16 16'%3E%3Cpath d='M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z'/%3E%3C/svg%3E"
        }
    }
    #root;
    #name;
    #owner;
    #source;
    #cover;
    #demo;
    #license;
    #stars;
    #forks;
    #platforms;
    #mention;
    #description;
    #stars_section;
    #forks_section;
    #cover_dialog;
    #cover_dialog_objs;

    show_cover (){
        this.#cover_dialog.showModal();
        document.body.style.overflow = "hidden";
    }

    close_cover (){
        this.#cover_dialog.close();
        document.body.style.overflow = "unset";
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.#cover_dialog = document.createElement("dialog");
        this.#cover_dialog.className = "cover_dialog";
        this.#cover_dialog.addEventListener("close", ()=>{document.body.style.overflow = "unset";})
        this.#cover_dialog_objs = {
            close: document.createElement("img"),
            cover: document.createElement("img")
        };
        this.#cover_dialog_objs.close.className = "dialog_close icon";
        this.#cover_dialog_objs.close.addEventListener("click", (e, root=this)=>{root.close_cover();});
        this.#cover_dialog_objs.close.addEventListener("keypress", (e, root=this)=>{if(e.key=="Enter" || e.key==" ") root.close_cover();})
        this.#cover_dialog_objs.close.setAttribute("draggable",false);
        this.#cover_dialog_objs.close.alt = "Close";
        this.#cover_dialog_objs.close.tabIndex = 1;

        let dialog_cover_container = document.createElement("div");
        dialog_cover_container.className = "dialog_cover_container"

        this.#cover_dialog_objs.cover.className = "dialog_cover";
        this.#cover_dialog_objs.cover.setAttribute("draggable",false);
        this.#cover_dialog_objs.cover.alt = "Cover";

        this.#cover_dialog.append(this.#cover_dialog_objs.close);
        dialog_cover_container.append(this.#cover_dialog_objs.cover);
        this.#cover_dialog.append(dialog_cover_container);

        this.shadowRoot.append(this.#cover_dialog);

        this.#root = document.createElement("div");
        this.#root.tabIndex = 1;
        this.#root.className = "root";

        this.#name = document.createElement("div");
        this.#name.className = "name";
        this.#name.tabIndex = 2;
        this.#root.append(this.#name);

        this.#owner = document.createElement("div");
        this.#owner.className = "owner";
        this.#owner.tabIndex = 5;
        this.#root.append(this.#owner);

        let info_section = document.createElement("div");
        info_section.className = "info_section"

        let source_image = document.createElement("img");
        source_image.className = "icon"
        source_image.alt = "source";
        source_image.setAttribute("draggable",false);
        source_image.src = this.#icons.source;

        this.#source = document.createElement("a");
        this.#source.className = "source icon";
        this.#source.target = "_blank";
        this.#source.tabIndex = 11;
        this.#source.append(source_image);
        info_section.append(this.#source);

        this.#cover = document.createElement("img");
        this.#cover.setAttribute("draggable",false);
        this.#cover.className = "cover";
        this.#cover.alt = "cover";
        this.#cover.addEventListener("click", (e, root=this)=>{root.show_cover();})
        this.#cover.addEventListener("keypress", (e, root=this)=>{if(e.key=="Enter" || e.key==" ") root.show_cover();})
        this.#cover.tabIndex = 4;
        this.#root.append(this.#cover);

        let demo_image = document.createElement("img");
        demo_image.className = "icon"
        demo_image.alt = "demo";
        demo_image.setAttribute("draggable",false);
        demo_image.src = this.#icons.demo;

        this.#demo = document.createElement("a");
        this.#demo.className = "demo icon";
        this.#demo.target = "_blank";
        this.#demo.append(demo_image);
        this.#demo.tabIndex = 10;
        info_section.append(this.#demo);

        this.#license = document.createElement("div");
        this.#license.className = "license icon";
        this.#license.tabIndex = 9;
        
        let license_icon = document.createElement("img");
        license_icon.className = "icon";
        license_icon.alt = "license";
        license_icon.setAttribute("draggable",false);
        license_icon.src = this.#icons.license;

        this.#license.append(license_icon);  
        info_section.append(this.#license);

        this.#root.append(info_section);

        let github_info = document.createElement("div");
        github_info.className = "github_info";

        this.#stars_section = document.createElement("div");
        this.#stars_section.className = "stars_section";
        this.#stars_section.tabIndex = 6;
        this.#stars_section.setAttribute("special-title","Stars");

        let stars_icon = document.createElement("img");
        stars_icon.className = "icon";
        stars_icon.alt = "stars";
        stars_icon.setAttribute("draggable",false);
        stars_icon.src = this.#icons.stars;

        this.#stars = document.createElement("div");
        this.#stars.className = "stars";
        this.#stars_section.append(stars_icon);
        this.#stars_section.append(this.#stars);

        this.#forks_section = document.createElement("div");
        this.#forks_section.className = "forks_section";
        this.#forks_section.tabIndex = 7;
        this.#forks_section.setAttribute("special-title","Forks");

        let forks_icon = document.createElement("img");
        forks_icon.className = "icon"
        forks_icon.alt = "forks";
        forks_icon.setAttribute("draggable",false);
        forks_icon.src = this.#icons.forks;

        this.#forks = document.createElement("div");
        this.#forks.className = "forks";
        this.#forks_section.append(forks_icon);
        this.#forks_section.append(this.#forks);

        github_info.append(this.#stars_section);
        github_info.append(this.#forks_section);

        this.#root.append(github_info);

        this.#platforms = document.createElement("div");
        this.#platforms.className = "platforms";
        this.#root.append(this.#platforms);


        let mention_image = document.createElement("img");
        mention_image.className = "icon";
        mention_image.alt = "mention";
        mention_image.setAttribute("draggable",false);
        mention_image.src = this.#icons.mention;

        this.#mention = document.createElement("a");
        this.#mention.className = "mention icon";
        this.#mention.target = "_blank";
        this.#mention.append(mention_image);
        this.#mention.tabIndex = 8;
        info_section.append(this.#mention);


        this.#description = document.createElement("div");
        this.#description.className = "description";
        this.#description.tabIndex = 3;
        this.#root.append(this.#description);

        this.shadowRoot.append(this.#root);

        let style = document.createElement("style");

        style.textContent = `
        :host {
            position: relative;
            display: block;
            width: 400px;
            height: 200px;
            background: #222222;
            border-radius: 15px;
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

        .icon {
            width: 24px;
            height: 24px;
        }

        .name {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #ffffff;
            font-size: 24px;
        }

        .description {
            position: absolute;
            top: 45px;
            right: 15px;
            color: #ffffff;
            font-size: 18px;
            opacity: 0.8;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: calc(100% - 150px);
            text-align: right;
        }

        .cover {
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translate(-50%, 0px);
            height: calc(100% - 130px);
            width: 95%;
            object-fit: contain;
        }

        .owner {
            position: absolute;
            bottom: 15px;
            left: 15px;
            color: #ffffff;
            font-size: 18px;
        }

        .info_section {
            position: absolute;
            bottom: 15px;
            right: 15px;
            color: #ffffff;
            font-size: 18px;
            display: flex;
            flex-direction: row-reverse;
            column-gap: 5px;
        }

        .github_info {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
            bottom: 15px;
        }

        .github_info, .stars_section, .forks_section {
            display: flex;
            align-items: center;
            column-gap: 5px;
        }

        .platforms {
            position: absolute;
            left: 15px;
            top: 15px;
            display: flex;
            column-gap: 5px;
        }

        .cover_dialog {
            width: 90%;
            height: 90%;
            background: #222222;
            border: none;
            border-radius: 15px;
        }

        .dialog_close {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 1;
        }

        .dialog_cover_container {
            position: absolute;
            max-width: 95%;
            height: 95%;
            left: 50%;
            top: 2.5%;
            overflow: auto;
            display: flex;
            transform: translate(-50%, 0px);
        }

        dialog::backdrop {
            background: #00000066;
        }

        @media screen and (max-width: 500px) {
            .description {
                width: calc(100% - 50px);
            }
        }

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #222222; 
        }

        ::-webkit-scrollbar-thumb {
            background: #555555; 
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #888888; 
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
        this.#name.innerText = this.getAttribute("name");
        this.#owner.innerText = this.getAttribute("owner");
        this.#source.href = this.getAttribute("source");
        this.#cover.src = this.getAttribute("cover");
        this.#cover_dialog_objs.cover.src = this.getAttribute("cover");
        this.#cover_dialog_objs.close.src = this.#icons.close;
        if(!this.hasAttribute("demo")) {
            this.#demo.remove();
        } else {
            this.#demo.href = this.getAttribute("demo");
        }
        this.#license.setAttribute("special-title", this.getAttribute("license"));
        if(!this.hasAttribute("stars")) {
            this.#stars_section.style.display = "none";
        } else {
            this.#stars.innerText = this.getAttribute("stars");
        }
        if(!this.hasAttribute("forks")) {
            this.#forks_section.style.display = "none";
        } else {
            this.#forks.innerText = this.getAttribute("forks");
        }
        this.getAttribute("platforms").split(",").forEach((platform)=>{
            let platform_container = document.createElement("div");

            let platform_icon = document.createElement("img");
            platform_icon.className = "icon";
            platform_icon.alt = platform;
            platform_icon.setAttribute("draggable",false);
            platform_icon.src = this.#icons.platforms[platform];

            platform_container.append(platform_icon);
            platform_container.setAttribute("special-title", platform);
            platform_container.setAttribute("special-title-pos", "bottom");

            this.#platforms.append(platform_container);
        })
        if(!this.hasAttribute("mention")) {
            this.#mention.remove();
        } else {
            this.#mention.href = this.getAttribute("mention");
            let link = new URL(this.getAttribute("mention"));
            if(link.host=="twitter.com"){
                this.#mention.setAttribute("special-title","Mentioned by " + link.pathname.split("/")[1]);
            } else if(link.host=="github.com"){
                this.#mention.setAttribute("special-title","Mentioned by " + link.pathname.split("/")[2]);
            } else {
                this.#mention.setAttribute("special-title","Mentioned by " + link.host);
            }
        }
        this.#description.innerText = this.getAttribute("description");
    }
}

);
