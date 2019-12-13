import { Component, OnInit, Renderer2 } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'team-member';
  users: any = [];
  totalUsers: number;
  isLoading = false;

  showAddress = false

  constructor(private userService: UsersService, private renderer: Renderer2) { }

  ngOnInit() {
    this.fetchUsers();
    this.isLoading = true;
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(response => {
      // console.log(response);
      this.isLoading = false;
      this.users = response;
      this.users.map(user => {
        let hashemail = this.stringToHash(user.email);
        user['avatar'] = 'https://www.gravatar.com/avatar/' + hashemail;
      })
      console.log(this.users)
      this.totalUsers = this.users.length;

      // console.log(this.totalUsers)
    })
  }

  showaddress(addressid, iconid) {
    this.showAddress = !this.showAddress
    let elem = document.querySelector("#" + addressid);
    let icon = document.querySelector("#" + iconid);
    this.renderer[this.showAddress ? 'removeClass' : 'addClass'](elem, 'd-none');
    icon.className = !this.showAddress ? "fas fa-chevron-right" : "fas fa-chevron-down";
  }

  stringToHash(string) {
    var hash = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash;
    }

    return hash;
  }
}
