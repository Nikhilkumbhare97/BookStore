import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginAndSignUpComponent } from './user-login-and-sign-up.component';

describe('UserLoginAndSignUpComponent', () => {
  let component: UserLoginAndSignUpComponent;
  let fixture: ComponentFixture<UserLoginAndSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginAndSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginAndSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
