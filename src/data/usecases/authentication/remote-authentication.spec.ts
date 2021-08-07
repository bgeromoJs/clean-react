import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpCliente with corret URL', async () => {
    class HttpPostClienteSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClienteSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy) // system under test = objeto que está sendo testado.
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
