import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { HttpPostClienteSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

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
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpCliente with corret body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpCliente returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
