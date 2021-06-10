import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  selectedValue: string;

  bookArray = [] as any

  constructor(private user: UserService, private snackBar: MatSnackBar) { }

  sorts: Sort[] = [
    {value: 'lowtohigh', viewValue: 'Price: Low to High'},
    {value: 'hightolow', viewValue: 'Price: Hight to Low'},
    {value: 'new', viewValue: 'Newest'}
  ];

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.user.getBooks().subscribe((res)=>{
      console.log(res);
      this.bookArray = res['result'];
    },(error)=>{
      console.log(error);
    })
  }

  addToCart(data){
    console.log(data);

    let bookId = data._id;
    let arr = []  as any;

    let reqObj = {
      quantity : 1
    }
    console.log(bookId);

    this.user.addBook(bookId,reqObj).subscribe((res) => {
      console.log(res)
      arr = res
      this.snackBar.open(arr.message, "Cancel");
    },(error) => {
      console.log(error)
      this.snackBar.open(arr.message, "Cancel");
    })
  }
}
