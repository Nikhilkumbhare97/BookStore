import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchword: String;

  constructor(private router: Router) { }

  @Input() childMessage;
  @Input() childMessages;

  ngOnInit(): void {
    console.log(this.childMessage)
    console.log(this.childMessages)
  }

  redirect() {
    this.router.navigate(['/dashboard'])
  }

  @Output() searchcriteria = new EventEmitter<String>();
  searchThis() {
    this.searchcriteria.emit(this.searchword)
  }
}
