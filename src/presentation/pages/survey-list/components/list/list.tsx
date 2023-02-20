import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import React from 'react'
import { SurveyItem } from '../survey-item/survey-item'
import { SurveyItemEmpty } from '../survey-item/survey-item-empty/survey-item-empty'

import styles from './list-styles.scss'

type Props = {
  surveys: LoadSurveyList.Model[]
}

export const List: React.FC<Props> = ({ surveys }) => {
  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
