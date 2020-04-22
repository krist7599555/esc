import { NotFoundException } from '@nestjs/common';
import { map, pluck, tap, retry } from 'rxjs/operators';
import axios from 'axios';
import { defer } from 'rxjs';

export function englib(student_id: string) {
  return defer(() => axios.request({
    method:  'POST',
    url:     '/api/user/verify-student',
    baseURL: 'https://www.library.eng.chula.ac.th',
    data:    { studentID: student_id },
  }))
    .pipe(
      retry(3),
      pluck('data'),
      tap(raw => {
        if (raw.message == 'invalid')
          throw new NotFoundException('user not exist in cu engineer api');
      }),
      map(raw => ({
        id:         raw.studentId as string,
        nameEN:     raw.fName as string,
        surnameEN:  raw.lName as string,
        email:      raw.email as string,
        department: raw.department as string,
        phone:      raw.tel as string,
      })),
    ).toPromise();
}
