import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MenuService, Menu, SubMenu } from './service/menu.service';

import { TreeviewService } from '../treeview/service/treeview.service';
import { TreeView } from '../treeview/service/treeview';
import { BehaviorSubject } from 'rxjs';
import { ConfigStorage } from 'src/app/@core/storage/config/config';

declare var $: any;

@Component({
  selector: 'nex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(window:resize)': 'onResize($event)'}
})
export class MenuComponent implements OnInit, OnDestroy {

    @Input() orientacao: string = "vertical";
    @Output() eventClick: EventEmitter<any> = new EventEmitter();

    heightHD: number = 768;
    height: number = window.innerHeight;

    menuSelect: number = 0;
    menuSelectSubject: BehaviorSubject<number>;

    constructor(private treeviewService: TreeviewService,
                public menuService: MenuService,
                private configService: ConfigStorage) { 

      this.menuSelectSubject = this.menuService.menuSelectSubject();

      this.menuSelectSubject
        .subscribe((index: number) => {
          if(index != null) {
            this.menuSelect = index;
            this.onMenuItem_Click(index);  
          }
        });
    }

    ngOnInit(): void {
      this.menuService.menuPopulate(this.orientacao);
    }

    onResize(event){
      this.height = event.target.innerHeight;
    }

    setTreeview(treeview: TreeView[], menu: string, menuId: string) {        
        this.menuService.clearMenu();

        let docMenu = document.getElementById(menuId);
        docMenu.classList.add("active");
        $(docMenu).find('.dropdown-menu').css({'display': 'none'});

        this.treeviewService.setTreeview(treeview);
    }

    menuItemEnter(menuId: string) {
      let docMenu = document.getElementById(menuId);
      $(docMenu).find('.dropdown-menu').css({'display': 'block'});
    }

    menuItemLeave(menuId: string) {
      let docMenu = document.getElementById(menuId);
      $(docMenu).find('.dropdown-menu').css({'display': 'none'});
    }

    onMenuItem_Click(index: number){
      this.menuSelect = index;
      const id: any = this.menuService.menu[index].id;
      this.eventClick.emit(id);
    }

    submenuFilter(submenu: SubMenu[]) {
      return submenu.filter(sub => (sub.visible == true) && 
                                   (sub.solucaoIntegrada == undefined ||
                                    sub.solucaoIntegrada == this.configService.config.sistema.solucaoIntegrada));
    }

    submenuTop(id: string) {
      return document.getElementById(id)?.offsetTop - 97;
    }

    ngOnDestroy() {
      this.menuSelectSubject.unsubscribe();
    }

}
