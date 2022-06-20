/** @type {import('next-sitemap').IConfig} */
import config from './config'

module.exports = {
  siteUrl: config.SITE_URL,
  generateRobotsTxt: true, // (optional)
  // ...other options
}