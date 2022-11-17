import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'nex-report',
    template: `<div>
        <h2>Stimulsoft Reports.JS - Report.mrt - Viewer</h2>
        <div id="viewerContent"></div>
    </div>`,
    encapsulation: ViewEncapsulation.None
})
export class Report implements OnInit {

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
  
    }

}

