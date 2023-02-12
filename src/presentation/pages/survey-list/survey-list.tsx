import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer } from '@/presentation/components'
import { Header } from '@/presentation/components/header/header'
import React, { useEffect, useState } from 'react'
import { SurveyContext } from './components'
import { Error } from './components/error/error'
import { List } from './components/list/list'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => setState(old => ({ ...old, error: error.message })))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
        {
            state.error
              ? <Error />
              : <List />
          }
        </SurveyContext.Provider>

      </div>
      <Footer />
    </div>
  )
}
