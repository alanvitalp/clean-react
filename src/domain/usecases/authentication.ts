import { AccountModel } from 'domain/models/account-model'

export interface Authentication {
  auth: (params: AddAuthentication.Params) => Promise<AddAuthentication.Model>
}

export namespace AddAuthentication {
  export type Params = {
    email: string
    password: string
  }

  export type Model = AccountModel
}