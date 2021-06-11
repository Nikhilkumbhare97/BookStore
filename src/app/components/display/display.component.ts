import { Component, OnInit } from '@angular/core';
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
  addCart = [] as any

  constructor(private user: UserService, private snackBar: MatSnackBar) { }

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
    this.byDefault = true;
  }

  getAllBooks() {
    this.user.getBooks().subscribe((res) => {
      console.log(res);
      this.bookArray = res['result'];
    }, (error) => {
      console.log(error);
    })
  }

  addToCart(data) {
    console.log(this.bookArray);
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
      this.addCart = res;
      console.log(this.addCart)
      this.openSnackBar(arr.message, 2000);
      this.byDefault = false;
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
}
