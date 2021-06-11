import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() childMessage;
  
  ngOnInit(): void {
    console.log(this.childMessage)
  }

  redirect(){
    this.router.navigate(['/dashboard'])
  }
}
