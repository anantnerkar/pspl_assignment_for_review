import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.isLoggedIn = false;
  }

  logout() {
    this.accountService.logout();
  }
}
