import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PagingService {

    activePage: HTMLElement;
    fisrtPage: HTMLElement;
    secondPage: HTMLElement;
    thirdPage: HTMLElement;
    pageItens: HTMLElement;

    totalPages: number;
    numPages: number;

    onStart_Click() {
        if(this.fisrtPage && this.secondPage && this.thirdPage) {
            this.fisrtPage.innerHTML = "1";
            this.secondPage.innerHTML = "2";
            this.thirdPage.innerHTML = "3";

            this.onActive(this.fisrtPage);    
        }
    }

    onActive(newActive: HTMLElement) {
        if (this.activePage) {
            this.activePage.classList.remove("active");
        }
        this.activePage = newActive;
        this.activePage.classList.add("active");

        if (this.activePage.innerHTML == "1") {
            document.getElementById("before")?.classList.add("disabled");
            document.getElementById("start")?.classList.add("disabled");
        }

        if (this.activePage.innerHTML != "1" && (document.getElementById("before").classList.contains("disabled"))) {
            document.getElementById("before")?.classList.remove("disabled");
            document.getElementById("start")?.classList.remove("disabled");
        }

        if (Number.parseInt(this.activePage.innerHTML) == this.numPages) {
            document.getElementById("next")?.classList.add("disabled");
            document.getElementById("end")?.classList.add("disabled");
        }

        if (Number.parseInt(this.activePage.innerHTML) < this.numPages && (document.getElementById("next").classList.contains("disabled"))) {
            document.getElementById("next")?.classList.remove("disabled");
            document.getElementById("end")?.classList.remove("disabled");
        }

    }

    setPageNum(numPage: number) {
        if(this.secondPage && this.thirdPage && this.pageItens) {
            switch (numPage) {
                case 1: 
                    this.secondPage.style.display = "none";
                    this.thirdPage.style.display = "none";
                    this.pageItens.style.width = "147px";
                    break;
                
                case 2: 
                    this.secondPage.style.display = "block";
                    this.thirdPage.style.display = "none";
                    this.pageItens.style.width = "178px";
                    break;
                
                default: 
                    this.secondPage.style.display = "block";
                    this.thirdPage.style.display = "block";
                    this.pageItens.style.width = "207px";
                    break;

            }
        }
        this.numPages = numPage;
        this.onStart_Click();
    }

    setTotalPage(totalPages: number) {
        this.totalPages = totalPages;
    }

    setPage(page: number) {
        let newActive: HTMLElement = this.activePage;
        if(this.fisrtPage && this.secondPage && this.thirdPage) {
            switch (page) {
                case 1: 
                    this.fisrtPage.innerHTML = "1";
                    this.secondPage.innerHTML = "2";
                    this.thirdPage.innerHTML = "3";
                    newActive = this.fisrtPage;
                    break;
                
                case 2: 
                    this.fisrtPage.innerHTML = "1";
                    this.secondPage.innerHTML = "2";
                    this.thirdPage.innerHTML = "3";
                    newActive = this.secondPage;
                    break;
                
                case 3: 
                    this.fisrtPage.innerHTML = "1";
                    this.secondPage.innerHTML = "2";
                    this.thirdPage.innerHTML = "3";
                    newActive = this.thirdPage;
                    break;
                
                default: 
                    this.fisrtPage.innerHTML = (String)(page - 2);
                    this.secondPage.innerHTML = (String)(page - 1);
                    this.thirdPage.innerHTML = (String)(page);
                    newActive = this.thirdPage;
                    break;
                
            }
    
            this.onActive(newActive);
        }
    }
}