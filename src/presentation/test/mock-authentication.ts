import { mockAccountModel } from '@/domain/test'
import { Authentication, AddAuthentication, AddAccount } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AddAuthentication.Params
  callsCount = 0
  async auth (params: AddAuthentication.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
