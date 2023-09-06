#!/bin/node

var fs = require("fs");

renderer = {
    consts: {
        platforms: {
            "android": {
                name:"Android",
                code:"bootstrap/android"
            },
            "windows": {
                name:"Windows",
                code:"bootstrap/windows"
            },
            "web": {
                name:"Web",
                code:"bootstrap/web"
            },
            "extension": {
                name:"Web Extension",
                code:"bootstrap/extension"
            },
            "arduino": {
                name:"Arduino",
                code:"bootstrap/arduino"
            },
            "linux": {
                name:"Linux",
                code:"bootstrap/linux"
            },
            "pwa": {
                name:"Progressive Web App",
                code:"unpacked/pwa"
            }
        },
        tools: {
            "illustrator": {
                name:"Adobe Illustrator",
                code:"simple-icons/illustrator"
            },
            "blender": {
                name:"Blender",
                code:"simple-icons/blender"
            }
        }
    },
    helper: {
        get_variant: (variant) => {
            if(variant=="#"){
                return "en";
            } else {
                return variant.slice(1);
            }
        },
        eacher: (dictionary, template, list) => {
            let created_html = "";
            let available_items = Object.keys(dictionary);
            for(let item_index=0; item_index<available_items.length; item_index++){
                let item = available_items[item_index];
                if(!list.includes(item)) continue;
                let codes = template.match(/\%[a-zA-Z]+\%/g).map(e=>e.replaceAll("%",""));
                let changed_template = template;
                for (let code_index=0; code_index < codes.length; code_index++){
                    let code = codes[code_index];
                    changed_template = changed_template.replace(`%${code}%`, dictionary[item][code]);
                }
                created_html += changed_template;
            }
            return created_html;
        },
        varianter: (template, variants) => {
            let available_variants = Object.keys(variants||{});
            if(available_variants.length == 0) return "";
            
            if(available_variants.length == 1){
                return template.replace("%variant%","").replace("%text%", variants["#"]);
            } else {
                let created_html = "";
                for(let variant_index=0; variant_index<available_variants.length; variant_index++){
                    let variant = available_variants[variant_index];
                    created_html += template.replace("%variant%",`variant="${renderer.helper.get_variant(variant)}"`).replace("%text%", variants[variant]);
                }
                return created_html;
            }
        },
        get_mentioner: (mention) => {
            let site = (mention?.match(/\:\/\/[a-zA-Z0-9\.]+\//g)||[""])[0].slice(3,-1);
            if(site == "x.com" || site == "twitter.com" || site == "github.com"){
                return mention.split(site)[1].split("/")[1] + " on " + site;
            }
            return site;
        }
    },
    projects: (file_name) => {
        let json_file = fs.readFileSync(file_name);
        let projects = JSON.parse(json_file);
        let created_html = "";
        let id_pointer = null;
        for(let project_index=0; project_index < projects.length; project_index++){
            let project = projects[project_index];
            
            if(project.type == "pointer") { // adding pointer
                id_pointer = project.pointer;
                continue;
            } else if(project.type == "software"){ // software rendering
                    created_html += `
<book-page id="${project.id}">
    ${(!!id_pointer) ? `<id-pointer id="`+id_pointer+`"></id-pointer>` : `` }
    ${renderer.helper.varianter(`<h1 class="title" %variant%>%text%</h1>`, project.name)}
    ${renderer.helper.varianter(`<h2 class="description" %variant%>%text%</h2>`, project.description)}
    <img-viewer class="preview">
        <img src="assets/covers/softwares/${project.cover}" alt="Preview of ${project.name["#"]}" aria-label="Preview of ${project.name["#"]}" draggable="false"/>
    </img-viewer>
    <wolf-claw>
        <app-icon code="bootstrap/platforms" tip="{html}" inject button="1" tabindex="0" notabindex>
            <ul class="tip platforms">
                ${renderer.helper.eacher(renderer.consts.platforms, `<li><app-icon code="%code%">%name%</app-icon></li>`, project.platforms)}
            </ul>
        </app-icon>
        <app-icon code="bootstrap/license" button="2">${project.license}</app-icon>
        <app-icon code="bootstrap/stars" pre-tip="${project.stars}" button="3">${project.stars} Star</app-icon>
        <a href="${project.source}" target="_blank" tabindex="-1" button="4">
            <app-icon code="bootstrap/source">Github</app-icon>
        </a>
        <${(project.mentions != 0) ? "a" : "span hidden"} href="${project.mentions[0]}" target="_blank" tabindex="-1" button="5">
            <app-icon code="bootstrap/mention">Mentioned by ${renderer.helper.get_mentioner(project.mentions[0])}</app-icon>
        </${(project.mentions != 0) ? "a" : "span"}>
        <${(project.forks > 0) ? "app-icon" : "span hidden"} code="bootstrap/forks" pre-tip="${project.forks}" button="${(project.mentions == 0 && project.demo == null) ? 5 : 6}">${project.forks} Fork</${(project.forks > 0) ? "app-icon" : "span"}>
        <${(project.demo != null) ? "a" : "span hidden"} href="${project.demo}" target="_blank" tabindex="-1" button="${(project.mentions == 0) ? 5 : 7}">
            <app-icon code="bootstrap/demo">Open Demo</app-icon>
        </${(project.demo != null) ? "a" : "span"}>
        <p class="owner" tabindex="0" tip="Project Owner">${project.owner}</p>
    </wolf-claw>
</book-page>
`;
            } else if(project.type == "design") { // design rendering
                created_html += `
<book-page id="${project.id}">
${(!!id_pointer) ? `<id-pointer id="`+id_pointer+`"></id-pointer>` : `` }
${renderer.helper.varianter(`<h1 class="title" %variant%>%text%</h1>`, project.name)}
${renderer.helper.varianter(`<h2 class="description" %variant%>%text%</h2>`, project.description)}
<img-viewer class="preview">
    <img src="assets/covers/designs/${project.cover}" alt="Preview of ${project.name["#"]}" aria-label="Preview of ${project.name["#"]}" draggable="false"/>
</img-viewer>
<wolf-claw>
    <app-icon code="bootstrap/tools" tip="{html}" inject button="1" tabindex="0" notabindex>
        <ul class="tip tools">
            ${renderer.helper.eacher(renderer.consts.tools, `<li><app-icon code="%code%">%name%</app-icon></li>`, project.tools)}
        </ul>
    </app-icon>
    <app-icon code="bootstrap/likes" pre-tip="${project.likes}" button="2">${project.likes} Like</app-icon>
    <a href="${project.source}" target="_blank" tabindex="-1" button="3">
        <app-icon code="bootstrap/source">${project.source_host}</app-icon>
    </a>
    <${(project.demo != null) ? "a" : "span hidden"} href="${project.demo}" target="_blank" tabindex="-1" button="4">
        <app-icon code="bootstrap/demo">Open Preview</app-icon>
    </${(project.demo != null) ? "a" : "span"}>
    <p class="owner" tabindex="0" tip="Design Owner">${project.owner}</p>
</wolf-claw>
</book-page>
`;
            } // finish rendering
            if(!!id_pointer){
                id_pointer = null;
            }
        }
        return created_html;
    }
};

let index_template = fs.readFileSync("index_template.html")
let page_source = (new TextDecoder()).decode(index_template);;
let render_nodes = page_source.match(/\<\$(render|RENDER) type\=\"[a-zA-Z]+\"\>[a-zA-Z\.]+<\/\$(render|RENDER)\>/g);
for(let render_index=0; render_index < render_nodes.length; render_index++){
    let node = render_nodes[render_index];
    let render_type = node.match(/type\=\"[a-zA-Z]+\"/g)[0].toLowerCase().slice(6, -1);
    let render_file = node.match(/\>[a-zA-Z\.]+</g)[0].slice(1, -1);
    let render = renderer[render_type];
    if(render != null) {
        page_source = page_source.replace(node, render(render_file));
    } else {
        console.error("<$render> type is unknown");
    }
}

fs.writeFileSync("../index.html", page_source);
