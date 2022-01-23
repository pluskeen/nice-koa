import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { MIMEType } from '../enum';

/** 当前时间的长日期格式 */
export const longNewDate = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss', {locale: zhCN})
}

/** 当前时间的长日期格式 */
export const newDate = () => {
  return format(new Date(), 'yyyy-MM-dd', {locale: zhCN})
}


export const fileExt = (MIMEType: string) => {
  const [type, subType] = MIMEType.split('/');
  return {type, subType};
}
