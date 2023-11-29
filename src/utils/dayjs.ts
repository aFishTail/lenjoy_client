import * as dayjs from 'dayjs'
import * as relativeTime  from 'dayjs/plugin/relativeTime'
require('dayjs/locale/zh-cn')

dayjs.locale('zh-cn')
dayjs.extend(relativeTime as any)

export default dayjs