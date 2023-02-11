import React from 'react'
import styles from './survey-item-empty-styles.scss'

export const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
    </>
  )
}
