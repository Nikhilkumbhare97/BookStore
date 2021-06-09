import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
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
      this.openSnackBar('Registering user...', 0);
      let data = {
        fullName: this.form.controls.name.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        phone: this.form.controls.mobileNo.value,
      }

      console.log(data);
      this.userService.register(data).subscribe(response => {
        console.log(response);
        this.openSnackBar('Registration successful', 3000);
        this.router.navigate(['/login']);
      },
        error => {
          if (error['status'] == 0) {
            this.openSnackBar('Registration failed: server offline', 2000,);
          }
          else {
            this.openSnackBar('Registration failed: ' + error['error']['message'], 2000);
          }
        }
      );
    }
  }
}
