import { Error, Footer, Header, Loading } from '@/presentation/components'
import React from 'react'

import styles from './survey-result-styles.scss'


import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { useHistory } from 'react-router-dom'
import { Result } from './components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })

  const [state, setState] = React.useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  React.useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({ surveyResult: null, error: '', isLoading: false, reload: !old.reload }))
  }

  return (
    <div className={styles.surveyResultWrap}>
       <Header />
        <div data-testid="survey-result" className={styles.contentWrap}>
          { state.surveyResult && <Result surveyResult={state.surveyResult} />}
          { state.isLoading && <Loading />}
          { state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
    </div>
  )
}
