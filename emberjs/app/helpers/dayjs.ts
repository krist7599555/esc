import { helper } from '@ember/component/helper';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)


export default helper(function dayjs_format([value, format_str]: [string, string | undefined], { fn }: {fn: keyof dayjs.Dayjs}) {
  if (fn) {
    // @ts-ignore
    return dayjs(value)[fn](format_str)
  } else {
    return dayjs(value).format(format_str);
  }
});
