import { faker } from '@faker-js/faker'
import { LoadSurveyResult } from '../usecases'
import { SaveSurveyResult } from '../usecases/save-survey-result';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10)
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.lorem.sentence(),
  date: faker.date.recent(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.lorem.sentence(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountAnswer: true
  },{
    answer: faker.lorem.sentence(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountAnswer: false
  }]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.surveyResult
  }
}


export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResult = mockSurveyResultModel()
  params: SaveSurveyResult.Params
  callsCount = 0
  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params
    this.callsCount++
    return this.surveyResult
  }
}


