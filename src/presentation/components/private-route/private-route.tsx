import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useRecoilValue } from 'recoil'
import { currentAccountState } from '../atoms/atoms'

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  return (
    getCurrentAccount()?.accessToken
      ? <Route {...props} />
      : <Route {...props} component={() => <Redirect to="/login" />} />
  )
}
