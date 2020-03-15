import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { pluck, tap, map } from 'rxjs/operators';

@Injectable()
export class EnglibraryService {
  constructor(private http: HttpService) {}
  public get(student_id: string) {
    return this.http
      .request({
        method:  'POST',
        url:     '/api/user/verify-student',
        baseURL: 'https://www.library.eng.chula.ac.th',
        data:    { studentID: student_id },
      })
      .pipe(
        pluck('data'),
        tap(raw => {
          if (raw.message == 'invalid')
            throw new HttpException('user not exist in cu engineer api', 404);
        }),
        map(raw => ({
          id:         raw.studentId,
          nameEN:     raw.fName,
          surnameEN:  raw.lName,
          email:      raw.email,
          department: raw.department,
          phone:      raw.tel,
        })),
      );
  }
}
