import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Error, Footer } from '@/presentation/components'
import { Header } from '@/presentation/components/header/header'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect } from 'react'
import { List } from './components/list/list'
import Styles from './survey-list-styles.scss'

import { useRecoilState } from 'recoil'
import { surveyListState } from './components'

type Props = {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyListState)

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => {
        setState(old => ({ ...old, surveys: [] }))
        handleError(error)
      })
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({ surveys: [], error: '', reload: !old.reload }))
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {
            state.error
              ? <Error error={state.error} reload={reload} />
              : <List surveys={state.surveys} />
          }
      </div>
      <Footer />
    </div>
  )
}
