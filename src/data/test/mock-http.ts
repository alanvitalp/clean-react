import { faker } from '@faker-js/faker'
import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '../protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

export class HttpPostClientSpy<R> implements HttpPostClient {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
