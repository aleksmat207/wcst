import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '../../../node_modules/@angular/platform-browser';
import { CardsModel } from '../service/CardsService/cards.model';
import { CardsService } from '../service/CardsService/cards.service';
import { RuleService } from '../service/RuleService/rule.service';
import { RuleModel } from '../service/RuleService/rule.model';
import { AngularWaitBarrier } from '../../../node_modules/blocking-proxy/built/lib/angular_wait_barrier';
import { equal } from 'assert';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

startingCards: Array<CardsModel>=[];
card:CardsModel;
previousCard:CardsModel;
imagePaths:Array<SafeResourceUrl>=[];
randomImagePath:SafeResourceUrl;
decodedCards: Array<string>;
rule:RuleModel;
previousRule:RuleModel={name};

  constructor(private cardsService: CardsService, private sanitizer : DomSanitizer, private ruleService: RuleService,) { }

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
  //console.log(this.imagePaths)
});
}
getRandomCard(){
    this.cardsService.getRandomCard().subscribe(
        r=>{
            this.card=r;
            this.isCardRepeated();
            this.randomImagePath=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + r.imgbase);
        }
    )
}
checkCard(){
    switch(this.rule.name){
        case "color":
        
        break;
        case "sign":
        break;
        case "case":
        break;
    }
}
isCardRepeated(){
    if(JSON.stringify(this.card) === JSON.stringify(this.previousCard)){
        console.log("KARTY SIE POWTORZYLY!!!!")

   this.getRandomCard() }
   else{  console.log(2)
       this.previousCard=this.card;
   }
}
getRandomRule(){
    this.ruleService.getRandomRule().subscribe(
        r=>{
            this.rule=r;
            this.isRuleRepeated();
        }
    )
   console.log(this.rule)

}
isRuleRepeated(){
    if(JSON.stringify(this.rule).toLowerCase() === JSON.stringify(this.previousRule).toLowerCase()){
        console.log(1)

   this.getRandomRule() }
   else{  console.log(2)
       this.previousRule=this.rule;
   }
}
// dataURItoBlob(binary) {
//   var array = [];
//    array.push(binary);
// return new Blob([new Uint8Array(array)], {
//   type: 'image/png'
// });
// }

}
