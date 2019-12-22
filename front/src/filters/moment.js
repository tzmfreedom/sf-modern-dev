import moment from 'moment'

export default (date) => {
  return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
}