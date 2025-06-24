import { Component,Renderer2,ElementRef } from '@angular/core';

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

  constructor( private renderer: Renderer2,private el: ElementRef
  ) { }

  ngOnInit() {
    this.intializebhasiniTranslationPlugin();
    (window as any).fbAsyncInit = function () {
      window['FB'].init({
        appId: '557200617035448', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v12.0' // Use the latest version
      });
    }
  }
  addAttachment() {
  }

  intializebhasiniTranslationPlugin(){
    try {
      const container = this.el.nativeElement.querySelector('.bhashini-plugin-container');

    if (container) {
      const script = this.renderer.createElement('script');
script.src = 'http://files.odev.oci.diksha.gov.in/ntp-content-production/website_translation_utility.js';      script.async = true;
      this.renderer.appendChild(document.body, script);
    } 
    } catch (error) {
      console.log('Translation failed:', error);
    }
    
  }
}


