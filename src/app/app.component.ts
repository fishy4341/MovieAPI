import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public authenticated;

  public appPages = [
    {
      title: 'Search',
      url: '/search',
      icon: 'search'
    },
    {
      title: 'My Movies list',
      url: '/user-list',
      icon: 'list-box'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list-box'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService
  ) {
    this.initializeApp();
    this.auth.isAuthenticated().subscribe(x => this.authenticated = x);
  }

  initializeApp():void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
