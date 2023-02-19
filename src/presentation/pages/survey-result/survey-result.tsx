import { Footer, Header, Spinner } from '@/presentation/components'
import React from 'react'

import styles from './survey-result-styles.scss'

import FlipMove from 'react-flip-move'
import { Loading } from '@/presentation/components/loading/loading'

export const SurveyResult = () => {
  return (
    <div className={styles.surveyResultWrap}>
       <Header />
        <div className={styles.contentWrap}>
          <h2>Qual é seu framework web preferido?</h2>      
          <FlipMove className={styles.answerList}>
            <li>
              <img src="" />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percent}>50%</span>
            </li>
            <li className={styles.active}>
              <img src="" />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percent}>50%</span>
            </li>
            <li>
              <img src="" />
              <span className={styles.answer}>ReactJS</span>
              <span className={styles.percent}>50%</span>
            </li>
          </FlipMove>
          <button>Voltar</button>
          { false && <Loading /> }
        </div>
        <Footer />
    </div>
  )
}
