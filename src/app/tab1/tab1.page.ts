import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  coords: Coordinates;
  dest_address = 'Alcalá 200, Madrid';

  constructor(
    private geo: Geolocation,
    private nav: LaunchNavigator,
    private social: SocialSharing
  ) {

    // this.geo.getCurrentPosition().then((resp) => {
    //   this.coords = resp.coords;
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    this.geo.watchPosition().subscribe(
      (resp) => {
        this.coords = resp.coords;
      },
      (error) => {
        console.log('Error getting location', error);
      }
    );

  }

  openNavigationApp() {
    let options: LaunchNavigatorOptions = {
      start: ''+this.coords.latitude+','+this.coords.longitude
    };

    this.nav.navigate(this.dest_address, options);
  }

  share() {
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title,
    };

    this.social.shareWithOptions(options);
  }
}
