import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(params.url, params.body)
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data
      }
    } catch (error) {
      if (error.response) {
        httpResponse = error.response
      } else {
        httpResponse = {
          ...error,
          status: 500
        }
      }
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
