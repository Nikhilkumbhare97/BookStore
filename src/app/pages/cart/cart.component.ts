import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  show = 1;
  show1 = 0;

  constructor(private user: UserService, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }
  parentMessage = 0;
  cartArray = [] as any;
  length = 0;
  quantity: number = 1;

  name = new FormControl('', [Validators.required])
  phoneNo = new FormControl('', [Validators.required])
  pincode = new FormControl('', [Validators.required])
  locality = new FormControl('', [Validators.required])
  address = new FormControl('', [Validators.required])
  city = new FormControl('', [Validators.required])
  landmark = new FormControl('', [Validators.required])

  ngOnInit(): void {
    this.displayItems()
  }

  display(num, num1) {
    this.show += num;
    this.show1 += num1;
  }

  displayItems() {
    let arr = [] as any
    this.user.getCartItem().subscribe((res) => {
      console.log(res)
      arr = res
      this.length = arr.result.length;
      this.cartArray = arr.result
      console.log(this.length);
      this.parentMessage = this.length;
      console.log(this.cartArray);
    }, (error) => {
      console.log(error)
    })
  }

  deleteBook(data: any) {
    console.log(data);
    let id = data._id;
    console.log(id);

    this.user.deleteCartItem(id).subscribe((res: any) => {
      console.log(res)
      this.openSnackBar(res.message, 2000);
      this.displayItems()
    }, (error) => {
      console.log(error)
    })
  }

  i = 1
  increment(data) {
    if (this.i != data.product_id.quantity) {
      this.i++;
      this.quantity = this.i;
    }
  }

  decrement() {
    if (this.i != 1) {
      this.i--;
      this.quantity = this.i;
    }
  }

  displays(num) {
    if (this.name.valid && this.phoneNo.valid && this.address.valid && this.city.valid) {
      this.show1 += num;
    }
  }
}
