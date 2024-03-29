import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-newsdisplay',
  templateUrl: './newsdisplay.page.html',
  styleUrls: ['./newsdisplay.page.scss'],
})
export class NewsdisplayPage implements OnInit {
  data:any
  
  constructor(private route: ActivatedRoute,private router: Router,private tts: TextToSpeech) { 
    this.route.queryParams.subscribe(params =>
      {
        console.log(params);
        if(params){
          this.data = {
            title : params.title,
            content : params.content,
            description : params.description,
            source_id : params.source_id,
            img : params.img,
            url : params.url,
            auth:params.auth
          }
          console.log(this.data);
          
        }
      })
  }

  speak():void{
    const speechContent = this.data.content ? this.data.content : this.data.description
    this.tts.speak({
      text : 'The title of the article is '+' '+this.data.title+'\n \n'+'             .     It states '+' '+speechContent,
      rate: 0.95
    })
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }
  
  back(){
  this.tts.speak('')
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
