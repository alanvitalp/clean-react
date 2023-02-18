import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer } from '@/presentation/components'
import { Header } from '@/presentation/components/header/header'
import { ApiContext } from '@/presentation/contexts'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { SurveyContext } from './components'
import { Error } from './components/error/error'
import { List } from './components/list/list'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => {
        if (error.message instanceof AccessDeniedError) {
          setState(old => ({ ...old, surveys: [] }))
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState(old => ({ ...old, error: error.message }))
        }
      })
  }, [state.reload])

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
