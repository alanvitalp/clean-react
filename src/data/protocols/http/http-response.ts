export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}


export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}