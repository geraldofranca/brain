import { HttpResponse } from "../protocols/http";

export const created = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
