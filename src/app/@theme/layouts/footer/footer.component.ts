import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { LoginService } from 'src/app/login/service/login.service';
import { MenuService } from '../menu/service/menu.service';

@Component({
  selector: 'nex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  constructor(private router: Router,
         private menuService: MenuService,
         private genericGraphQL: GenericGraphQL) {}

  ngOnInit(): void {}

  onInformativo_Click() {
    this.menuService.clearMenu(true);
    document.getElementById("inf_1599").classList.add("active");
    this.router.navigate(['pages/informativo']);
  }

}
