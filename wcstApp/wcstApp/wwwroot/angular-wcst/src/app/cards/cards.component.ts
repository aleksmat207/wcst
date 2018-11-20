import { Component, OnInit } from "@angular/core";
import {
  DomSanitizer,
  SafeResourceUrl
} from "../../../node_modules/@angular/platform-browser";
import { CardsModel } from "../service/CardsService/cards.model";
import { CardsService } from "../service/CardsService/cards.service";
import { RuleService } from "../service/RuleService/rule.service";
import { RuleModel } from "../service/RuleService/rule.model";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  startingCards: Array<CardsModel> = [];
  card: CardsModel;
  previousCard: CardsModel;
  imagePaths: Array<SafeResourceUrl> = [];
  randomImagePath: SafeResourceUrl;
  isRuleChecked: boolean;
  decodedCards: Array<string>;
  rule: RuleModel;
  ruleCounter: number;
  mistakeCounter: number;
  result:string;
  isStarted:boolean;
  previousRule: RuleModel = { name };

  constructor(
    private cardsService: CardsService,
    private ruleService: RuleService
  ) {}

  ngOnInit() {
    this.mistakeCounter = 0;
    this.ruleCounter = 0;
    this.getRandomRule();
  }
  getStartingCards() {
    this.cardsService.getStartingCards().subscribe(r => {
      this.startingCards = r;
      this.isStarted=true;
      // console.log(this.startingCards)
      //  this.decode()
    });
  }
  // decode(){
  //     this.imagePaths=[]
  //     this.startingCards.forEach(card => {
  //   this.imagePaths.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + card.imgbase));
  // });
  // }
  getRandomCard() {
    this.cardsService.getRandomCard().subscribe(r => {
      this.card = r;
      this.isCardRepeated();
      //this.randomImagePath=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + r.imgbase);
    });
  }
  checkCard(element) {
    console.log(element);

    switch (this.rule.name) {
      case "color":
        if (element.color == this.card.color) {
          this.ruleCounter = this.ruleCounter + 1;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result="Dobrze!";
        } else {
          this.mistakeCounter++;
          console.log("ZLE! mistakeCounter:", this.mistakeCounter);
          this.result="Źle!";
        }
        break;
      case "sign":
      if (element.sign == this.card.sign) {
        this.ruleCounter = this.ruleCounter + 1;
        console.log("DOBRZE! ruleCounter:", this.ruleCounter);
        this.result="Dobrze!";
      } else {
        this.mistakeCounter++;
        console.log("ZLE! mistakeCounter:", this.mistakeCounter);
        this.result="Źle!";
      }
        break;
      case "amount":
      if (element.amount == this.card.amount) {
        this.ruleCounter = this.ruleCounter + 1;
        console.log("DOBRZE! ruleCounter:", this.ruleCounter);
        this.result="Dobrze!";
      } else {
        this.mistakeCounter++;
        console.log("ZLE! mistakeCounter:", this.mistakeCounter);
        this.result="Źle!";
      }
        break;
    }
    this.getRandomCard();
    if(this.ruleCounter==10){
        this.ruleCounter=0;
        console.log("ZMIANA REGUŁY! ruleCounter:", this.ruleCounter);
        this.getRandomRule();
    }
  }
  isCardRepeated() {
    if (JSON.stringify(this.card) === JSON.stringify(this.previousCard)) {
      console.log("KARTY SIE POWTORZYLY!!!!");

      this.getRandomCard();
    } else {
      this.previousCard = this.card;
    }
  }
  getRandomRule() {
    this.ruleService.getRandomRule().subscribe(r => {
      this.rule = r;
      this.isRuleRepeated();
      this.isRuleChecked = true;
    });
  }
  isRuleRepeated() {
    if (
      JSON.stringify(this.rule).toLowerCase() ===
      JSON.stringify(this.previousRule).toLowerCase()
    ) {
      this.getRandomRule();
    } else {
      this.previousRule = this.rule;
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
