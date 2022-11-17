import { Injectable } from '@angular/core';
import { TabComponentClass } from '../tab/tab-card.component';

Injectable({
    providedIn: "root"
})
export class TabsService {

    posInit: number;
    tabActive: HTMLElement;

    tabs: Array<TabComponentClass> = [];
    tabNameActive: string;

    add(name: string, title: string, active: boolean = false, display?: string, background?: string) {
        this.tabs.push({
            name: name,
            title: title,
            active: active,
            background: background,
            display: display
        });
        if(active) {
            this.tabNameActive = name;
        }
    }

    hideTab(tab: any) {
        let elemTab: HTMLElement = document.getElementById("tab-" + tab.title);
        if(elemTab) {
            elemTab.style.display = "none";
        }
    }

    showTab(tab: any) {
        let elemTab: HTMLElement = document.getElementById("tab-" + tab.title);
        if(elemTab) {
            elemTab.style.display = "block";
        }
    }

    selectTab(tab: any) {
        console.log(this.posInit);
        this.tabs.forEach(tab => tab.active = false);
        let elemTab: HTMLElement = document.getElementById(tab.name);
        if(elemTab) {
            if(elemTab.style.left == "") {
                let elemOffSet: number = elemTab.offsetLeft;
                let leftTab: number = ((elemOffSet - this.posInit) * -1);        
                elemTab.style.left = leftTab + "px";
            }
            this.tabActive = elemTab;
        }
        tab.active = true;
        this.tabNameActive = tab.name;
    }

    select(tabName: string) {
        const index = this.tabs.findIndex(tab => tab.name == tabName);
        if(index >= 0) {
            this.selectTab(this.tabs[index]);
        }
    }

    onResize() {      
        this.tabs.forEach(tab => {
            let elemTab: HTMLElement = document.getElementById(tab.name);
            elemTab.style.left = "";
            if(tab.active == true) {
                let elemOffSet: number = elemTab.offsetLeft;
                let leftTab: number = ((elemOffSet - this.posInit) * -1);        
                elemTab.style.left = leftTab + "px";
            }
        });
    }  
  
}