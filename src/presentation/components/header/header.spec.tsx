import React from 'react'
import {  fireEvent, render, screen } from "@testing-library/react"
import { Header } from "./header"
import ApiContext from '@/presentation/contexts/api/api-context'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'


describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )

    fireEvent.click(screen.getByTestId('logout'))
    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  })
})