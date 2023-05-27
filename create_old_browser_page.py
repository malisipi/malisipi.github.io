#!/usr/bin/env python3

from bs4 import BeautifulSoup
import re

def create_button_macro(url, text, image):
    the_tag = "&content"
    if url==None or text==None:
        return ""
        
    if url!=None and url!="":
        the_tag=the_tag.replace("&content", "<a href=\""+url+"\" target=\"_blank\">&content</a>")
        
    if image!=None:
        if text==None:
            text=""
        the_tag=the_tag.replace("&content", "<button><img draggable=false src=\""+image+"\" alt=\""+text+"\" title=\""+text+"\" />"+text+"</button>")
    else:
        the_tag=the_tag.replace("&content", "<button>"+text+"</button>")
        
    return the_tag

def parse_website_creator(url):
    if url==None:
        return url
    pattern = re.compile(r"[a-z0-9]+\.[a-z]+\/", re.IGNORECASE)
    return pattern.findall(url)[0].replace("/","")

template = open("./templates/old_browsers.template","r").readlines()
html = open("index.html","r").read()
parsed_html = BeautifulSoup(html, features="lxml")
old_browsers_html = ""
for line in template:
    line = line.split(" ")
    command = line.pop(0).replace("\n","")
    args = " ".join(line).replace("\n","")
    match command:
        case "#title":
            old_browsers_html += "<title>"+args+"</title>\n"
        case "%include":
            old_browsers_html += "<link rel=\"stylesheet\" href=\""+args+"\">\n"
        case "%text":
            old_browsers_html += "<p>"+args+"</p>\n"
        case "%image":
            old_browsers_html += "<img src=\""+args+"\" />\n"
        case "$project_section":
            projects = parsed_html.body.find_all('project-preview')
            for project in projects:
                old_browsers_html += f"""<div class="project-preview">
    <h3>{project.get("name")}</h3>
    <p>{project.get("description")}</p>
    <div><a href="{project.get("cover").replace("covers","covers-png").replace(".webp",".png")}" target="_blank"><img class="cover" draggable="false" src="{project.get("cover").replace("covers","covers-png").replace(".webp",".png")}" /></a></div>
    {create_button_macro(project.get("source"), "Source", "assets/tango/package-x-generic.png")}
    {create_button_macro(project.get("demo"), "Demo", "assets/tango/applications-internet.png")}
    {create_button_macro("", project.get("stars"), "assets/tango/emblem-favorite.png")}
    {create_button_macro("", project.get("forks"), "assets/tango/edit-copy.png")}
    {create_button_macro("", project.get("license"), "assets/tango/application-certificate.png")}
    {create_button_macro(project.get("mention"), parse_website_creator(project.get("mention")), "assets/tango/internet-news-reader.png")}
</div>\n"""
        case "$contact_section":
            social = parsed_html.body.find('social-media')
            old_browsers_html += "<br><div class=\"social-media\">"
            i = 0
            sm_images = ["assets/tango/package-x-generic.png", "assets/tango/internet-mail.png"]
            for sm in ["github","mail"]:
                old_browsers_html += create_button_macro(social.get(sm), sm.capitalize(), sm_images[i]) + "\n"
                i += 1
            
            old_browsers_html += "</div>"

open("old_browsers.html","w").write("<center>"+old_browsers_html+"</center>")
