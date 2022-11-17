import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ModalService {

    grid: HTMLElement;
    form: HTMLElement;
    buttons: HTMLCollectionOf<Element>;

    lockScreen(opacity: string = "0.6") {
        this.grid = document.getElementById("grid");
        this.form = document.getElementById("form");

        this.buttons = document.getElementsByClassName("btn")

        if(this.grid) this.grid.classList.add("disabled");
        if(this.form) this.form.classList.add("disabled");

        if(this.grid) this.grid.style.opacity = opacity;
        if(this.form) this.form.style.opacity = opacity;
    }

    unlockScreen() {
        this.grid = document.getElementById("grid");
        this.form = document.getElementById("form");

        if(this.grid) this.grid.classList.remove("disabled");
        if(this.form) this.form.classList.remove("disabled");

        if(this.grid) this.grid.style.opacity = "1";
        if(this.form) this.form.style.opacity = "1";
    }
}