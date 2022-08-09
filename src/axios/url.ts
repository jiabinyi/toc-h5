const URLS: any = {
  development: '/dev',
  test: '/test',
  production: '/production'
}
const env: string = process.env.NODE_ENV || 'development'
const url: string = URLS[env]
export default url
