import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  categories = ["top","business","entertainment","environment","food","health","politics","science","sports","technology"]
  speechMatches: String[];
  data : any;
  isRecording = false;
  api_key = ""  
  constructor(public http: HttpClient,private plt: Platform, private cd: ChangeDetectorRef,private speechRecognition: SpeechRecognition,private route: Router,private platform: Platform,private alertController: AlertController) {
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
    this.getData('top', finaldate);
  }
  
  // stopListening() {
  //   this.speechRecognition.stopListening().then(() => {
  //     this.isRecording = false;
  //   });
  // }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  startListening() {
    this.getPermission()
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening({ matches : 2 })
      .subscribe(matches => {
        this.speechMatches = matches;
        // this.cd.detectChanges();
      })
    this.makeCall();
    // this.isRecording = true;
  }
  
  start() {
    this.data = null
    this.startListening();
    // if(!this.isRecording){
    //   this.isRecording = true;
    //   this.start()
    // }
    this.makeCall();
  }

  makeCall(){  
    var d = new Date();
    let finaldate = d.getFullYear()+'-'+(d.getUTCMonth()+1)+'-'+d.getDate();
    if(this.speechMatches){
      let speechArray = this.speechMatches[0].split(' ')
      if(this.categories.includes(speechArray[speechArray.length - 1].toLowerCase())){
        this.getData(speechArray[speechArray.length - 1].toLowerCase(), finaldate);
      }
    }
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
        img: artic.image_url,
        url: artic.link,
        auth:artic.source_id
      }
    } 
    this.route.navigate(['/newsdisplay'],navigationExtras);
  }


  getSelectedSubjectValue(getSelectedSubject){
    var d = new Date();
    let finaldate = d.getFullYear()+'-'+(d.getUTCMonth()+1)+'-'+d.getDate();
    this.getData(getSelectedSubject, finaldate);

  }
  getData(value, finaldate){
    console.log(finaldate);
    let url = `https://newsdata.io/api/1/news?apikey=${this.api_key}&category=${value}&language=en`;
    console.log(url);
    this.http.get(url).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
    this.isRecording = false;

  }


}
// ionic cordova run android --device