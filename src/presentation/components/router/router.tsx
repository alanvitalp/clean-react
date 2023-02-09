import { SurveyList } from '@/presentation/pages/survey-list/survey-list'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

export const Router: React.FC<Props> = (factory: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.makeLogin} />
        <Route path="/signup" exact component={factory.makeSignUp} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}
