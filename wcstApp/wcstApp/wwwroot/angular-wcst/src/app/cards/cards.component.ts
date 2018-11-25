import { Component, OnInit } from "@angular/core";
import {
  DomSanitizer,
  SafeResourceUrl
} from "../../../node_modules/@angular/platform-browser";
import { CardsModel } from "../service/CardsService/cards.model";
import { CardsService } from "../service/CardsService/cards.service";
import { RuleService } from "../service/RuleService/rule.service";
import { RuleModel } from "../service/RuleService/rule.model";
import { timer } from "../../../node_modules/rxjs/internal/observable/timer";
import { timeInterval, pluck, take } from "rxjs/operators";
@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  startingCards: Array<CardsModel> = [];
  card: CardsModel;
  cards: Array<CardsModel>=[];

  previousCard: CardsModel;
  imagePaths: Array<SafeResourceUrl> = [];
  randomImagePath: SafeResourceUrl;
  isRuleChecked: boolean;
  decodedCards: Array<string>;
  rule: RuleModel;
  ruleCounter: number;
  result: string;
  isStarted: boolean;
  previousRule: RuleModel = { name };
  mobile:boolean=false;
  ruleName:string;
  //scoring
  errors: number;
  responses:number;
  completedCategories:number;
  //stopwatch:
  x: number;
  intervalId;
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  pause = false;

  constructor(
    private cardsService: CardsService,
    private ruleService: RuleService
  ) {}

  ngOnInit() {
      if(window.screen.width<1024){
          this.mobile=true;
      }
    this.errors = 0;
    this.ruleCounter = 0;
    this.responses=0;
    this.completedCategories=0;
    this.ruleName="color";
    this.getDeck();
  }

  getStartingCards() {
    this.cardsService.getStartingCards().subscribe(r => {
      this.startingCards = r;
      this.isStarted = true;
      // console.log(this.startingCards)
      //  this.decode()
      this.onStartStopwatch()
      
    });
  }

  // decode(){
  //     this.imagePaths=[]
  //     this.startingCards.forEach(card => {
  //   this.imagePaths.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + card.imgbase));
  // });
  // }
  getDeck() {
    this.cardsService.getDeck().subscribe(r => {
// this.card=r;     
        this.cards = r;
     // this.isCardRepeated();
      //this.randomImagePath=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + r.imgbase);
    });
  }
  getRandomCard(){
    this.card= this.cards.pop();
  }
  checkCard(element) {
    console.log(element);

    switch (this.ruleName) {
      case "color":
        if (element.color == this.card.color) {
          this.ruleCounter = this.ruleCounter + 1;
          this.responses=this.responses+1;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
        } else {
          this.errors++;
          this.ruleCounter=0;
          console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
        }
        break;
      case "form":
        if (element.form == this.card.form) {
          this.ruleCounter = this.ruleCounter + 1;
          this.responses=this.responses+1;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
        } else {
          this.errors++;
          this.ruleCounter=0;
          console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
        }
        break;
      case "number":
        if (element.number == this.card.number) {
          this.ruleCounter = this.ruleCounter + 1;
          this.responses=this.responses+1;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
        } else {
          this.errors++;
          this.ruleCounter=0;
          console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
        }
        break;
    }
    this.getRandomCard();
    if (this.ruleCounter == 10) {
      this.ruleCounter = 0;
      this.completedCategories=this.completedCategories+1;
      console.log("ZMIANA REGUŁY! ruleCounter:", this.ruleCounter);
      this.getRandomRule();
    }
  }
  isCardRepeated() {
    if (JSON.stringify(this.card) === JSON.stringify(this.previousCard)) {
      console.log("KARTY SIE POWTORZYLY!!!!");

      this.getDeck();
    } else {
      this.previousCard = this.card;
    }
  }
  getRandomRule() {
    // this.ruleService.getRandomRule().subscribe(r => {
    //   this.rule = r;
    //   this.isRuleRepeated();
    //   this.isRuleChecked = true;
    // });
    switch (this.ruleName) {
        case "color":
        this.ruleName="form";
        break;
        case "form":
        this.ruleName="number";
        break;
        case "number":
        this.ruleName="color";
        break;
    }
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
  //stopwatch:
  onStartStopwatch() {
    this.x = 10;
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 100);
  }
  updateTime() {
    this.millisecond += this.x;

    if (this.millisecond > 90) {
      this.millisecond = 0;
      this.second++;
    }

    if (this.second > 59) {
      this.second = 0;
      this.minute++;
    }

    if (this.minute > 59) {
      this.minute = 0;
      this.hour++;
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
