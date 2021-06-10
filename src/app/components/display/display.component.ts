import { Component, OnInit } from '@angular/core';
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

  constructor(private user: UserService) { }

  sorts: Sort[] = [
    {value: 'lowtohigh', viewValue: 'Price: Low to High'},
    {value: 'hightolow', viewValue: 'Price: Hight to Low'},
    {value: 'new', viewValue: 'Newest'}
  ];

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    let arr = [] as any;
    this.user.getBooks().subscribe((res)=>{
      console.log(res);
      arr = res;
      this.bookArray = arr.result;
    },(error)=>{
      console.log(error);
    })
  }
}
