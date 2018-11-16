import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '../../../node_modules/@angular/platform-browser';
import { CardsModel } from '../service/CardsService/cards.model';
import { CardsService } from '../service/CardsService/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

startingCards: Array<CardsModel>=[];
card:CardsModel;
imagePaths:Array<SafeResourceUrl>=[];
randomImagePath:SafeResourceUrl;
decodedCards: Array<string>;

  constructor(private cardsService: CardsService, private sanitizer : DomSanitizer) { }

  ngOnInit() {
  }
getStartingCards(){
  this.cardsService.getStartingCards().subscribe(
    r=>{
      this.startingCards=r;
     // console.log(this.startingCards) 
      this.decode()
    }
  )
}
decode(){
    this.imagePaths=[]
    this.startingCards.forEach(card => {
  this.imagePaths.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + card.imgbase));
  console.log(this.imagePaths)
});
}
getRandomCard(){
    this.cardsService.getRandomCard().subscribe(
        r=>{
            this.card=r;
            this.randomImagePath=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + r.imgbase);
        }
    )
}
// dataURItoBlob(binary) {
//   var array = [];
//    array.push(binary);
// return new Blob([new Uint8Array(array)], {
//   type: 'image/png'
// });
// }

}
