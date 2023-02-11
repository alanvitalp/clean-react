import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  return (
    <Route {...props} component={() => <Redirect to="/login" />} />
  )
}
