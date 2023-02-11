import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return (
    getCurrentAccount()?.accessToken
      ? <Route {...props} />
      : <Route {...props} component={() => <Redirect to="/login" />} />
  )
}
