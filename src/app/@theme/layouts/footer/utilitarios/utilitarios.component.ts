import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nex-utilitarios',
  templateUrl: './utilitarios.component.html',
  styleUrls: ['./utilitarios.component.scss']
})
export class UtilitariosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onCaptura_Click() {
    this.router.navigate(['pages/captura']);
  }

}
