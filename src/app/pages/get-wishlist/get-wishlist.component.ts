import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-get-wishlist',
  templateUrl: './get-wishlist.component.html',
  styleUrls: ['./get-wishlist.component.scss']
})
export class GetWishlistComponent implements OnInit {

  constructor(private user : UserService, private snackBar: MatSnackBar) { }
  wishlistArray = [] as any;

  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0) {
      config.duration = duration;
    }
    this.snackBar.open(message, undefined, config);
  }

  ngOnInit(): void {
    this.displayItems();
  }

  displayItems() {
    let arr = [] as any
    this.user.getWishlistItem().subscribe((res) => {
      console.log(res)
      arr = res
      this.wishlistArray = arr.result
      console.log(this.wishlistArray);
    }, (error) => {
      console.log(error)
    })
  }

  deleteBook(data: any) {
    console.log(data);
    let bookId = data.product_id._id;
    console.log(bookId);
    this.user.deleteWishlistItem(bookId).subscribe((res: any) => {
      console.log(res)
      this.openSnackBar(res.message, 2000);
      this.displayItems()
    }, (error) => {
      console.log(error)
    })
  }
}
