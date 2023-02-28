import { Error, Footer, Header, Loading } from '@/presentation/components'
import React from 'react'

import styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Result } from './components'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { onSurveyAnswerState, surveyResultState } from './components/atoms/atoms'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }

    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, surveyResult, isLoading: false })))
      .catch(handleError)
  }

  React.useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  React.useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

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
