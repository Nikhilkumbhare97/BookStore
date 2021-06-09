import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private userService: UserService, public snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.openSnackBar('Login in Progress...', 0);
      let array = [] as any;
      let data = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }

      console.log(data);
      this.userService.login(data).subscribe(response => {
        this.openSnackBar('Login successful', 2000);
        console.log(response);
        array = response
        console.log(array.id)
        localStorage.setItem('id', array.id)
      },
        error => {
          try {
            if (error['status'] == 0) {
              this.openSnackBar('Login failed: server offline', 2000,);
            }
            else {
              this.openSnackBar('Login failed: ' + error['error']['message'], 2000);
            }
          }
          catch (error) {
          }
        });
        this.router.navigate(['.']);
    }
  }
}
