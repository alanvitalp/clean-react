import { RemoteLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../../decorators/authorize-http-get-client-decorator-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}`), makeAuthorizeHttpClientDecorator())
}
