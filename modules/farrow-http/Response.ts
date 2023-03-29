import { Response } from 'farrow-http'

const {
  string,
  json,
  html,
  text,
  redirect,
  stream,
  file,
  vary,
  cookie,
  cookies,
  header,
  headers,
  status,
  buffer,
  empty,
  attachment,
  custom,
  type, // contentType
} = Response

console.log(text('text').info)