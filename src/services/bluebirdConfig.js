import Promise from 'bluebird'

Promise.config({
  cancellation: true,
  longStackTraces: process.env.NODE_ENV === 'development',
  warnings: process.env.NODE_ENV === 'development'
})