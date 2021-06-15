import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this. displayItems();
  }

  length: any;
  parentMessage: any;

  displayItems() {
    let arr = [] as any
    this.user.getCartItem().subscribe((res) => {
      console.log(res)
      arr = res
      this.length = arr.result.length;
      console.log(this.length);
      this.parentMessage = this.length;
    }, (error) => {
      console.log(error)
    })
  }
}
