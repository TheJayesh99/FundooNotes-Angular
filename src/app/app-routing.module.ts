import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ArchiveComponent } from './archive/archive.component';
import { BinComponent } from './bin/bin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path:"login",component:LoginComponent},
  { path:"signup",component:SignupComponent},
  { path:"notes",component:NoteComponent,canActivate:[AuthGuard],
    children:[
      { path:"archive",component:ArchiveComponent },
      { path:"bin",component:BinComponent },
      { path:"home",component:HomeComponent },
      { path:"",redirectTo: 'home' ,pathMatch:'full'},
    ]
  },
  { path:"",redirectTo: 'notes' ,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
