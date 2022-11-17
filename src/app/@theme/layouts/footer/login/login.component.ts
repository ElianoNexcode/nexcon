import { Component, OnInit } from '@angular/core';
import { ConfigStorage, UserConfig } from 'src/app/@core/storage/config/config';

@Component({
  selector: 'nex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: UserConfig;

  constructor(private configStorage: ConfigStorage) { }

  ngOnInit() {
    const user: UserConfig = <UserConfig>this.configStorage.getConfig("user");
    this.user = <UserConfig>user;
  }

}
