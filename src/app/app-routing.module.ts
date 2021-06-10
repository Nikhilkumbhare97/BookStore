import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { UserLoginAndSignUpComponent } from './pages/user-login-and-sign-up/user-login-and-sign-up.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "",
    component: UserLoginAndSignUpComponent,
    children: [
      {path: "", redirectTo: "login", pathMatch: "full"},
      {path: "login", component:LoginComponent},
      {path: "signup", component: SignUpComponent}
    ]
  },
  {
    path:"dashboard",
    component: DashBoardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }