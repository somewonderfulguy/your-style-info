import Promise from 'bluebird'

// TODO expose of bluebird (use vanilla way to cancel promises)
Promise.config({
  cancellation: true,
  longStackTraces: process.env.NODE_ENV === 'development',
  warnings: process.env.NODE_ENV === 'development'
})