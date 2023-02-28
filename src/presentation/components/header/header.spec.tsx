import React from 'react'
import {  fireEvent, render, screen } from "@testing-library/react"
import { Header } from "./header"
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'

import { RecoilRoot } from 'recoil'

import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '../atoms/atoms'
type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  account: AccountModel
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }
    render(
      <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
        <Router history={history}>
          <Header />
        </Router>
      </RecoilRoot>
    )

  return {
    history,
    setCurrentAccountMock,
    account
  }
}


describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))
    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()

    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})