import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  menuState = false;
  route: string;
  href = '';
  unusedColors: any = {
    home: '#86c232',
    worlds: '#116466',
    vendors: '#cb2d6f',
    contact: '#faed26',
    about: '#00887a'
  };
  colorSchemes: any = {
    home: 'white',
    worlds: 'white',
    vendors: 'white',
    newsAndEvents: 'white',
    about: 'white',
    contact: 'white',
    shop: 'white'
  };
  backgrounds: any = {
    home: `url('assets/Images/backgrounds/futurescape/futurescape_light.jpg')`,
    worlds: `url('assets/Images/backgrounds/futurescape/white_future.jpg')`,
    vendors: `url('assets/Images/backgrounds/futurescape/futurescape_black.jpg')`,
    newsAndEvents: `url('assets/Images/backgrounds/futurescape/laser_lights.jpg')`,
    contact: `url('assets/Images/backgrounds/futurescape/futurescape_black.jpg')`,
    about: `url('assets/Images/backgrounds/futurescape/futurescape_medium.jpg')`,
  };
  constructor(private _route: ActivatedRoute, private router: Router, private location: Location) {}
  ngOnInit() {
      /*
      + Get corresponding sideNav element base on initial path
      + Set active nav button item left border style based on path
    */
    // path example: /home
    const path = this.getPath(this.location);
    const navHeight = $('.logoContainer').height();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const currPath = this.getPath(this.location).substring(1);
        this.setPageBackground(currPath);
        this.setNavHighlight(currPath);
      }
    });
  }
  setPageBackground(path) {
    const background = this.backgrounds[path];
    $('body').css('background', background);
    $('body').css('background-repeat',  'no-repeat');
    $('body').css('background-size',  '100% 100%');
    $('body').css('background-attachment',  'fixed');
  }
  setNavHighlight(path) {
    const elements = $('.appContainer a.nav-link');
    for (const elem of elements) {
      const currId = $(elem).attr('id');
      if (currId === path) {
        $(elem).addClass('active');
        $(elem).css('border-left', `2px solid ${this.colorSchemes[path]}`);
      } else {
        $(elem).removeClass('active');
        $(elem).css('border-left', `none`);
      }
    }
  }
  // getPath:: null -> string
  getPath(location: Location): string {
   return this.location.path();
  }
  // handleSocialMediaBtnClick:: Event -> void
  handleSocialMediaBtnClick(btn: string): void {
    // btn values: instagram, googlePlus, facebook, twitter, phone
    // no Google Plus account set yet, so alert user and do nothing
    if (btn === 'googlePlus') {
      alert('Google Plus Account Coming Soon!');
      return;
    }
    // use btn string to source action url
    const action = {
      phone: 'tel:8446330075',
      facebook: 'https://www.facebook.com/UnchartedRealities',
      twitter: 'https://twitter.com/UnchartedReal',
      instagram: 'https://www.instagram.com/UnchartedRealities/'
    }[btn];
    // open action url in new tab
    window.open(action, '_blank');
  }
}
