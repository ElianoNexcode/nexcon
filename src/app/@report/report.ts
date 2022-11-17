import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation } from '@angular/core';
// import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

@Component({
    selector: 'nex-report',
    template: `<div>
        <h2>Stimulsoft Reports.JS - Report.mrt - Viewer</h2>
        <div id="viewerContent"></div>
    </div>`,
    encapsulation: ViewEncapsulation.None
})
export class Report implements OnInit {
    // Loading fonts
    

    // viewer: any = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
    // report: any = new Stimulsoft.Report.StiReport();

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
  
      this.http.get('./assets/reports/NR0101.mrt')
        .subscribe((data: Response) => {
  
        // this.report.loadDocument(data.json());
        // this.viewer.report = this.report;
  
        // this.viewer.renderHtml('viewer');
      });
    }

}

