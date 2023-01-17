import { Login } from '@/presentation/pages/login/login'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
