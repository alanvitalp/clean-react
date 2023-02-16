import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import React, { useContext } from 'react'
import { SurveyContext } from '../contexts/context'
import { SurveyItem } from '../survey-item/survey-item'
import { SurveyItemEmpty } from '../survey-item/survey-item-empty/survey-item-empty'

import styles from './list-styles.scss'

export const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
