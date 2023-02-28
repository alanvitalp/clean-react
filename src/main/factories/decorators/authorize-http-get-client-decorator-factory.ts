import { HttpClient } from "@/data/protocols/http";
import { AuthorizeHttpClientDecorator } from "@/main/decorators/authorize-http-get-client-decorator/authorize-http-client-decorator";
import { makeLocalStorageAdapter } from "../cache/local-storage-adapter-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}