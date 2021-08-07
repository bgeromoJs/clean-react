import { HttpPostClienteSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpCliente with corret URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClienteSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy) // system under test = objeto que está sendo testado.
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
