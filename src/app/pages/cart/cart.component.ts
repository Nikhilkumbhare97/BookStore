import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  show = 1;

  constructor(private user : UserService,private snackBar: MatSnackBar) { }

  cartArray = [] as any;
  length = 0;

  ngOnInit(): void {
    this.displayItems()
  }

  display(num){
    this.show += num;
  }

  displayItems(){
    let arr = [] as any
    this.user.getCartItem().subscribe((res) => {
      console.log(res)
      arr = res
      this.length = arr.result.length;
      this.cartArray = arr.result
      console.log(this.length);
      console.log(this.cartArray);
    },(error) =>{
      console.log(error)
    })
  }

  deleteBook(data : any){
    console.log(data);
    let id  = data._id;
    console.log(id);
    
    this.user.deleteCartItem(id).subscribe((res : any) => {
      console.log(res)
      this.snackBar.open(res.message, "Cancel");
      this.displayItems()
    },(error) => {
      console.log(error)
    })
  }

}
