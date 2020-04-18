import 'dayjs/locale/th'
import * as dayjs from 'dayjs'
dayjs.locale('th');

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

console.log(dayjs.unix(1587216168).format())
console.log(dayjs.unix(1587216168).toISOString())
