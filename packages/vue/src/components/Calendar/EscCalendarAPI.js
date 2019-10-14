import dayjs from 'dayjs';
import _ from 'lodash';
import { value, computed, watch } from 'vue-function-api';

export const minute2dayjs = _minute => {
  const hour = _.floor(_minute / 60);
  const minute = _minute % 60;
  const day = dayjs()
    .startOf('day')
    .hour(hour)
    .minute(minute);
  return day;
};
export const mergeDayjs = (m1, m2) => {
  return m1 && m2 ? m1.add(m2.hour(), 'hour').add(m2.minute(), 'minute') : m1;
};

export const dateAPI = () => {
  const date = value(dayjs().toDate());
  const days = computed(() => ({
    abbr: 'อา จ อ พ พฤ ศ ส'.split(' '),
    full: 'อาทิตย์ จันทร์ อังคาร พุธ พฤหัสบดี ศุกร์ เสาร์'.split(' ')
  }));
  const day = computed(() => dayjs(date.value).day());

  const start = value(
    dayjs()
      .startOf('hour')
      .toDate()
  );
  const end = value(
    dayjs(start.value)
      .add(1, 'hour')
      .toDate()
  );

  const minDate = value(
    dayjs()
      .startOf('day')
      .toDate()
  );
  const maxDate = value(
    dayjs(minDate.value)
      .add(7, 'day')
      .toDate()
  );

  const strDate = date => dayjs(date).format('YYYY-MM-DD');
  const strTime = date => dayjs(date).format('HH:mm');

  const toISO = (date, time) => dayjs(`${strDate(date)}T${strTime(time)}+0700`).format();

  const startISO = computed(() => toISO(date.value, start.value));
  const endISO = computed(() => toISO(date.value, end.value));

  const shiftTime = duration => {
    start.value = dayjs(start.value)
      .add(duration, 'minute')
      .toDate();
    end.value = dayjs(end.value)
      .add(duration, 'minute')
      .toDate();
  };
  const dateDistance = date => {
    const dif = dayjs(date)
      .startOf('day')
      .diff(dayjs().startOf('day'), 'day');
    return dif ? `อีก ${dif} วัน` : 'วันนี้';
  };
  const selectedDateDistance = computed(() => dateDistance(date.value));
  const selectedTimeDistance = computed(() => {
    const minute = dayjs(end.value).diff(start.value, 'minute');
    if (minute < 0) return 'เวลาติดลบ ??';
    if (minute == 0) return 'เวลาเป็น 0';
    return _.join(
      [
        minute >= 60 ? `${_.floor(minute / 60)} ชั่วโมง` : '',
        minute % 60 ? `${minute % 60} นาที` : ''
      ],
      ' '
    ).trim();
  });
  const setTimeDuration = duration => {
    end.value = dayjs(start.value).add(duration, 'minute');
  };
  watch(
    () => [start.value, end.value],
    // ([snw, enw], [sol, eol]) => {
    (nw, ol) => {
      if (!ol) return;
      console.log(nw, ol);
      const [snw, enw] = nw;
      const [sol, eol] = ol;
      if (snw != sol && enw == eol) {
        end.value = dayjs(end.value)
          .add(dayjs(snw).diff(dayjs(sol)))
          .toDate();
      } else if (snw == sol && enw != eol) {
        start.value = dayjs(start.value)
          .add(dayjs(enw).diff(dayjs(eol)))
          .toDate();
      }
    },
    {
      lazy: true
    }
  );

  return {
    date,
    days,
    day,
    start,
    end,
    minDate,
    maxDate,
    strDate,
    strTime,
    toISO,
    startISO,
    endISO,
    dateDistance,
    shiftTime,
    selectedDateDistance,
    selectedTimeDistance,
    setTimeDuration
  };
};

export default dateAPI;
