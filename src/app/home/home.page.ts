import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data : any;
  
  constructor(public http: HttpClient,private route: Router,private platform: Platform,private alertController: AlertController) {
    var d = new Date();
    let finaldate = d.getFullYear()+'-'+(d.getUTCMonth()+1)+'-'+d.getDate();
    this.platform.backButton.subscribe(async () =>  {
      if (this.route.isActive('/home', true) && this.route.url === '/home') {
        const alert = await this.alertController.create({
          header: 'Close app?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Close',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });

        await alert.present();
      }
    })
    this.getData('technology',finaldate);
  }
  
  nextpage(artic){
    console.log(this.data.articles);
    console.log(artic.title);
    console.log(JSON.stringify(artic));
    let navigationExtras : NavigationExtras =  {
      queryParams : {
        title: artic.title,
        description: artic.description,
        content: artic.content,
        img: artic.urlToImage,
        url: artic.url,
        auth:artic.author
      }
    } 
    this.route.navigate(['/newsdisplay'],navigationExtras);
  }


  getSelectedSubjectValue(getSelectedSubject){
    var d = new Date();
    let finaldate = d.getFullYear()+'-'+(d.getUTCMonth()+1)+'-'+d.getDate();
    this.getData(getSelectedSubject,finaldate);
    // console.log(getSelectedSubject);

  }
  // onChange(selectedValue){
  //   console.info("Selected:",selectedValue);
  // }
  getData(value,finaldate){
    // let selection = document.getElementById("Select");
    console.log(finaldate);
    let url = 'https://newsapi.org/v2/everything?language=en&q='+value+'&from='+finaldate+'&apiKey=2fe23c6efa794d17bdc8b5181508f400';
    console.log(url);
    this.http.get(url).subscribe(data => {
      this.data = data;
      console.log(this.data);
      
    });
    // console.log(this.data);
  }


}
// ionic cordova run android --device