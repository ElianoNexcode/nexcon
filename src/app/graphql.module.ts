import { NgModule } from '@angular/core';

import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

interface configStruc {
  protocol: string
  address: string
  port: string
  path: string
}

@NgModule({
  imports: [HttpClientModule],
})
export class GraphQLModule {

  urlSettings!: String;

  constructor(private apollo: Apollo,
              private httpLink: HttpLink,
              private httpClient: HttpClient) {

    this.httpClient.get<configStruc>("./assets/config.json", httpOptions)
      .subscribe({
        next: (config: configStruc) => {
          const urlSettings = config.protocol + "://" + 
                              config.address + ((config.port)? ":" + config.port: "") + 
                              ((config.path)? "/" + config.path: "") + "/";
          this.apollo.create({
            link: this.httpLink.create({uri: urlSettings, withCredentials: false}),
            cache: new InMemoryCache(),
          });
        },
        error: (error: any) => {console.log(error)}
      });
  }

}
