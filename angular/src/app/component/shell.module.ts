import { NgModule        } from "@angular/core";
import { RouterModule    } from '@angular/router';
import { CommonModule    } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthModule      } from '../auth/auth.module';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  exports:      [FooterComponent, HeaderComponent],
  imports:      [RouterModule, AuthModule, CommonModule],
})
export class ShellModule {

}
