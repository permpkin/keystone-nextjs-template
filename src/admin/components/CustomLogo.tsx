import config from '../../../config'

export default function CustomLogo () {
  return <a href={config.SITE_URL}><h3>SITE_NAME</h3></a>
}