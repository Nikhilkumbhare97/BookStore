import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  wishlist = [] as any

  @Output() messageEvent = new EventEmitter<any>();

  constructor(private user: UserService, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  items: number = 0;

  sorts: Sort[] = [
    { value: 'lowtohigh', viewValue: 'Price: Low to High' },
    { value: 'hightolow', viewValue: 'Price: Hight to Low' },
    { value: 'new', viewValue: 'Newest' }
  ];

  ngOnInit(): void {
    this.getAllBooks();
    
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
    console.log(data);
    let bookId = data._id;
    let arr = [] as any;
    let reqObj = {
      quantity: 1
    }
    console.log(bookId);
    this.user.addBook(bookId, reqObj).subscribe((res) => {
      this.items += 1;
      this.sendMessage();
      console.log(res)
      arr = res;
      this.addCart = res;
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
      this.wishlist = res;
      this.openSnackBar(arr.message, 2000);
      this.wishlist = false;
    }, (error) => {
      console.log(error);
      this.openSnackBar(arr.message, 2000);
    })
  }

  sendMessage() {
    console.log(this.items)
    this.messageEvent.emit(this.items)
  }

  buttonChange(){
    if(this.bookArray._id == this.addCart._id){
      return true;
    }else if(this.bookArray._id == this.wishlist._id){
        return true;
    }else{
      return false;
    }
  }
}
