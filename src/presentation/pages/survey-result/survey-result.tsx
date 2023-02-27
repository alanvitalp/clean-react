import { Calendar, Error, Footer, Header, Loading, Spinner } from '@/presentation/components'
import React from 'react'

import styles from './survey-result-styles.scss'

import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { useHistory } from 'react-router-dom'

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

  const { goBack } = useHistory()

  return (
    <div className={styles.surveyResultWrap}>
       <Header />
        <div data-testid="survey-result" className={styles.contentWrap}>
          { state.surveyResult && (
            <>
              <hgroup>
                <Calendar date={state.surveyResult.date} className={styles.calendarWrap} />
                <h2 data-testid="question">{state.surveyResult.question}</h2>
              </hgroup>
              <FlipMove data-testid="answers" className={styles.answerList}>
                {state.surveyResult.answers.map(answer => (
                  <li
                    key={answer.answer}
                    data-testid="answer-wrap"
                    className={answer.isCurrentAccountAnswer ? styles.active : ''}
                  >
                    { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
                    <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
                    <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
                  </li>
                ))}
              </FlipMove>
              <button onClick={goBack} data-testid="back-button">Voltar</button>
            </>
          )}
          { state.isLoading && <Loading />}
          { state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
    </div>
  )
}
