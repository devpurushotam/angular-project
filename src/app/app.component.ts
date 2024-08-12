import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navItems = [
    { name: 'Home', link: '/' },
    { name: 'Common-test', link: '/common-test' },
    { name: 'G-Classroom', link: '/google-class-room' },
    { name: 'G-Auth', link: '/google-auth' },
    { name: 'G-iframe-Test', link: '/iframe-test' },
    { name: 'G-silent-auth', link: '/silent-auth' }
  ];

  title = 'my-angular-project';

  constructor(
  ) { }

  ngOnInit() {
  }

  addAttachment() {
  }
}
