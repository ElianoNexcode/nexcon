import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';

@Component({
    selector: 'nex-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    title: string;
    routeSubscribe: Subscription;

    constructor(
        private actionbuttomService: ActionButtomService,
        private route: ActivatedRoute) {    }


    ngOnInit(): void {
        this.actionbuttomService.top_action_buttons = [];

        this.routeSubscribe = this.route.queryParams
            .subscribe((params: { text: string }) => {
                this.title = params.text;
            });
    }

    ngOnDestroy(): void {
        this.routeSubscribe.unsubscribe();
    }
}