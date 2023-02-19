import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    const remoteSurveys = httpResponse.body || []
    
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteSurveys.map(remoteSurvey => ({
        ...remoteSurvey,
        date: new Date(remoteSurvey.date)
      }))
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model =  {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
