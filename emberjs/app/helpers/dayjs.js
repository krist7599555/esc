import { helper } from '@ember/component/helper';
import * as dayjs from 'dayjs';

export default helper(function dayjs_format([value, format_str]/*, hash*/) {
  return dayjs(value).format(format_str);
});
