import { HttpPostClienteSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClienteSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClienteSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy) // system under test = objeto que está sendo testado.
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpCliente with corret URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
