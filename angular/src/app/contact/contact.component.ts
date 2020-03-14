import { Component } from '@angular/core'
import { StudentService } from '../student.service'

@Component({
  selector:    'app-contact',
  templateUrl: './contact.component.html',
  styleUrls:   ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(public studentService: StudentService) { }
  get escContact() {
    return this.studentService.escContact
  }
  get escContactOrder() {
    return this.studentService.escContactOrder
  }

}
