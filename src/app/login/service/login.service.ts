import { Injectable } from '@angular/core';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';

import { LoginSchema } from './login.schema';
import { login, 
         Login,
         LoginData} from 'src/app/@core/data/login';

@Injectable()
export class LoginService extends LoginData {

    constructor(private graphQL: GenericGraphQL) {
        super();
    }

    login(login: Login) {
        const variables = { aplicativo: login.aplicativo, login: login.login, senha: login.senha }
        return this.graphQL.mutation<login>(LoginSchema.login, variables);
    }

    setToken(token: string) {
        this.graphQL.token_update(token);
    }

}