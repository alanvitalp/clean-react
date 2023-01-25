import { AxiosHttpClient } from "@/infra/http/axios-htt-client/axios-htt-client"

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}