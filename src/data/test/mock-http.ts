import faker from 'faker'
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '../protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
  headers: faker.datatype.json(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  headers?: any
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}
