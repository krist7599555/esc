import { Pipe, PipeTransform } from '@angular/core'
import * as dayjs from 'dayjs'
import * as _ from 'lodash'

@Pipe({
  name: 'date_format',
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  transform(value: number | string, format?: string): string {
    if (_.isNumber(value)) {
      return dayjs.unix(value).format(format)
    } else {
      return dayjs(value).format(format)
    }
  }
}
