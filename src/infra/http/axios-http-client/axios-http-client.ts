import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.post(params.url, params.body)
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error) {
      if (error.response) {
        axiosResponse = error.response
      } else {
        axiosResponse = {
          ...error,
          status: 500
        }
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
