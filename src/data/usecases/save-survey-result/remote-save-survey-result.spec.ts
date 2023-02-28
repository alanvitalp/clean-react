import { HttpStatusCode } from "@/data/protocols/http"
import { HttpClientSpy, mockRemoteSurveyResultModel } from "@/data/test"
import { faker } from "@faker-js/faker"
import { RemoteSaveSurveyResult } from "./remote-save-survey-result"

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should call HttpClient with correct values and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    await sut.save({
      answer: faker.random.word()
    })
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })
})