import { NotFoundException } from '@nestjs/common';
import { map, pluck, tap, retry } from 'rxjs/operators';
import axios from 'axios';
import { defer } from 'rxjs';
import { Person } from '../entity/person';

export function englib(studentId: string) {
  return defer(() =>
    axios.request({
      method: 'POST',
      url: '/api/user/verify-student',
      baseURL: 'https://www.library.eng.chula.ac.th',
      data: { studentID: studentId },
    }),
  )
    .pipe(
      retry(3),
      pluck('data'),
      tap((raw) => {
        if (raw.message == 'invalid')
          throw new NotFoundException('user not exist in cu engineer api');
      }),
      map<any, Partial<Person>>((raw) => ({
        student_id: raw.studentId,
        name_en: raw.fName,
        surname_en: raw.lName,
        email: raw.email,
        department: raw.department,
        phone: raw.tel,
      })),
    )
    .toPromise();
}
