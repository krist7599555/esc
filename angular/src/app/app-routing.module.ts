import { NgModule             } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent       } from './auth/login-page/login.component'
import { ProfileComponent     } from './auth/profile-page/profile.component'
import { ClubComponent        } from './club/club.component'
import { ContactComponent     } from './contact/contact.component'
import { HomeComponent        } from './home/home.component'
import { NotfoundComponent    } from './notfound/notfound.component'
import { RoomComponent        } from './room/index/room.component'
import { StudentComponent     } from './student/student.component'


const routes: Routes = [
  { path: '',        component: HomeComponent },
  { path: 'login',   component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'room',    component: RoomComponent },
  { path: 'club',    component: ClubComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'student', component: StudentComponent },
  { path: '**',      component: NotfoundComponent }
];

@NgModule({
  imports:      [RouterModule.forRoot(routes)],
  exports:      [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
