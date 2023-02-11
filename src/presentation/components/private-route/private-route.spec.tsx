import { render } from '@testing-library/react'
import { PrivateRoute } from './private-route'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import React from 'react'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  it('Should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
