import { Component } from '@angular/core'
import { StudentService } from '../student.service'

@Component({
  selector:    'app-student',
  templateUrl: './student.component.html',
  styleUrls:   ['./student.component.scss'],
})
export class StudentComponent {
  constructor(public studentService: StudentService) { }

}
