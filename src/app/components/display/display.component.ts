import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/userService/user.service';



interface Sort {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  byDefault = true;

  selectedValue: string;

  bookArray = [] as any
  cart = [] as any
  wish = [] as any

  constructor(private user: UserService, private snackBar: MatSnackBar) { }

  totalLength: any;
  page: number = 1;
  quantity: number = 10;

  @Input() searchText: string;

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  sorts: Sort[] = [
    { value: 'lowtohigh', viewValue: 'Price: Low to High' },
    { value: 'hightolow', viewValue: 'Price: Hight to Low' },
    { value: 'new', viewValue: 'Newest' }
  ];

  ngOnInit(): void {
    this.getAllBooks();
    this.displayItems();
    this.displayItem();
  }

  getAllBooks() {
    this.user.getBooks().subscribe((res) => {
      console.log(res);
      this.bookArray = res['result'];
      this.totalLength = this.bookArray.length;
      console.log(this.totalLength)
    }, (error) => {
      console.log(error);
    })
  }

  addToCart(data) {
    console.log(data);
    let bookId = data._id;
    let arr = [] as any;
    let reqObj = {
      quantity: 1
    }
    console.log(bookId);
    this.user.addBook(bookId, reqObj).subscribe((res) => {
      console.log(res)
      arr = res;
      this.openSnackBar(arr.message, 2000);
      this.getAllBooks();
    }, (error) => {
      console.log(error)
      this.openSnackBar(arr.message, 2000);
    })
  }

  addToWishList(data) {
    let bookId = data._id;
    let arr = [] as any
    let reqObj = {
      quantity: 1
    }
    this.user.addToWishlist(bookId, reqObj).subscribe((res) => {
      console.log(res);
      arr = res
      this.openSnackBar(arr.message, 2000);
    }, (error) => {
      console.log(error);
      this.openSnackBar(arr.message, 2000);
    })
  }

  displayItems() {
    this.user.getCartItem().subscribe((res) => {
      console.log(res)
      this.cart = res['result']
      console.log(this.cart);
    }, (error) => {
      console.log(error)
    })
  }

  displayItem() {
    this.user.getWishlistItem().subscribe((res) => {
      console.log(res)
      this.wish = res['result']
      console.log(this.wish);
    }, (error) => {
      console.log(error)
    })
  }

  buttonChange(id: any) {
    let result = this.cart.find((value) => {
      return value.product_id._id == id;
    })
    return result;
  }

  changeButton(id: any) {
    let result = this.wish.find((value) => {
      return value.product_id._id == id;
    })
    return result;
  }
}
