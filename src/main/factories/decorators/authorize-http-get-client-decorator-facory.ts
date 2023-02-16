import { HttpGetClient } from "@/data/protocols/http";
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators/authorize-http-get-client-decorator/authorize-http-get-client-decorator";
import { makeLocalStorageAdapter } from "../cache/local-storage-adapter-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}