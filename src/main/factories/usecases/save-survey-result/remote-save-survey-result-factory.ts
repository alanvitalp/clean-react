import { RemoteLoadSurveyResult, RemoteSaveSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { makeAuthorizeHttpClientDecorator } from '../../decorators/authorize-http-get-client-decorator-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
