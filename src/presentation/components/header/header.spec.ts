import {  fireEvent, screen } from "@testing-library/react"
import { Header } from "./header"
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'


import { mockAccountModel } from '@/domain/test'
import { renderWithHistory } from '@/presentation/test'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  account: AccountModel
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: Header,
    account
  })
    

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