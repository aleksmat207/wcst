import { Component, OnInit } from "@angular/core";
import { SafeResourceUrl } from "../../../node_modules/@angular/platform-browser";
import { CardsModel } from "../service/CardsService/cards.model";
import { CardsService } from "../service/CardsService/cards.service";
import { RuleService } from "../service/RuleService/rule.service";
import { RuleModel } from "../service/RuleService/rule.model";
import { timer } from "rxjs";
import { timeInterval, pluck, take } from "rxjs/operators";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { formatDate } from "@angular/common";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  startingCards: Array<CardsModel> = [];
  card: CardsModel;
  deck: Array<CardsModel> = [];
temp:number=0;
  //   previousCard: CardsModel;
  //   imagePaths: Array<SafeResourceUrl> = [];
  //  randomImagePath: SafeResourceUrl;
  //  previousRule: RuleModel = { name };
  //  decodedCards: Array<string>;
  //  rule: RuleModel;

  previousErrorRule: string;
  ruleCounter: number;
  result: string;
  isTestEnded: boolean = false;
  isStarted: boolean;
  isRuleChecked: boolean;
  mobile: boolean = false;
  ruleName: string;
  //scoring
  startDate: string;

  trial: number;
  errors: number;
  responses: number;
  completedCategories: number;
  time: string;
  nonPerservativeErrors: number;
  perservativeErrors: number;
  perservativeResponses: number;
  percentageOfResponses: number;
  percentageOfPerservativeErrors: number;
  failureToSet: number;
  trialsToFirstCategory: number;
  series: number;

  conceptualLevelResponse: number;
  learningToLearn: number;
  //stopwatch:

  x: number;
  intervalId;
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0; // czy potrzebne??
  pause = false;

  constructor(
    private cardsService: CardsService,
    private ruleService: RuleService
  ) {}

  ngOnInit() {
    if (window.screen.width < 1024) {
      this.mobile = true;
    }
    this.trial = 0;
    this.errors = 0;
    this.ruleCounter = 0;
    this.responses = 0;
    this.completedCategories = 0;
    this.nonPerservativeErrors = 0;
    this.perservativeErrors = 0;
    this.perservativeResponses = 0;
    this.trialsToFirstCategory = 0;
    this.series = 0;
    this.conceptualLevelResponse = 0;
    this.failureToSet = 0;
    this.previousErrorRule = "";
    this.ruleName = "color";
    this.getDeck();
  }
  getStartingCards() {
    this.cardsService.getStartingCards().subscribe(r => {
      this.startingCards = r;
      this.isStarted = true;
      // console.log(this.startingCards)
      //  this.decode()
      this.onStartStopwatch();
      let date = new Date();
      this.startDate = formatDate(date, "medium", "pl");
    });
  }
  // decode(){
  //     this.imagePaths=[]
  //     this.startingCards.forEach(card => {
  //   this.imagePaths.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + card.imgbase));
  // });
  // }
  makePdf() {
    let date = new Date();
    this.startDate = formatDate(date, "shortDate", "pl");
    var docDefinition = {
      content: [
        {  text: "Test sortowania kard z Wisconsin ", fontSize: 22 },
        " ",
        { text: "Data: " + this.startDate, fontSize: 22 },
        " ",
        "Czas trwania badania: " + this.time,
        "Ilość prób: "+ this.trial,
        "Ilość odpowiedzi: " + this.responses,
        "Ilość błędów: " + this.errors,
        "Ilość błędów perseweracyjnych: " + this.perservativeErrors,
        "Ilość błędów nieperseweracyjnych: " + this.nonPerservativeErrors,
        "Ilość odpowiedzi perseweracyjnych: " + this.perservativeResponses,
        "Procent odpowiedzi: " + this.percentageOfResponses,
        "Procent błędów perseweracyjnych: " + this.percentageOfPerservativeErrors.toFixed(2),
        "Ilość ukończonych kategorii: " + this.completedCategories,
        "Ilość prób do ukończenia pierwszej kategorii: " +
          this.trialsToFirstCategory,
         "Conceptual Level Response: " + this.conceptualLevelResponse,
"Brak utrzymania zestawu: " + this.failureToSet,
        
      ]
    };
    
    pdfMake.createPdf(docDefinition).download("WCST");
    pdfMake.createPdf(docDefinition).open();
  }
  getDeck() {
    this.cardsService.getDeck().subscribe(r => {
      // this.card=r;
      this.deck = r;
      // this.isCardRepeated();
      //this.randomImagePath=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + r.imgbase);
    });
  }
  getRandomCard() {
    if (this.deck.length>0) {this.card = this.deck.pop();
    this.temp++;
console.log("tslia", this.deck.length)
    }
    else {
      this.isTestEnded = true;
      this.pause = true;
      clearInterval(this.intervalId);
      if (this.hour > 0)
        this.time = this.hour + "h " + this.minute + "m " + this.second + "s";
      else this.time = this.minute + "m " + this.second + "s";

      console.log("KONIEC!!!!!!");
      this.calculateTrialsToFirstCategory();
      this.makeScoring();
    }
  }
  checkCard(element) {
    console.log(element);

    switch (this.ruleName) {
      case "color":
        if (element.color == this.card.color) {
          this.ruleCounter++;
          this.responses++;
          this.trial++;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trial++;
          console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (
            this.completedCategories > 0 &&
            element.number == this.card.number
          ) {
            this.perservativeResponses++;
            console.log("pr: ", this.perservativeResponses);
          }
          if (element.number == this.card.number) {
            this.previousErrorRule = "number";
          } else {
            this.previousErrorRule = "form";
          }
          this.checkPerseveration(element);
        }
        break;
      case "form":
        if (element.form == this.card.form) {
          this.ruleCounter++;
          this.responses++;
          this.trial++;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trial++;
          console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (
            this.completedCategories > 0 &&
            element.color == this.card.color
          ) {
            this.perservativeResponses++;
            console.log("pr: ", this.perservativeResponses);
          }
          if (element.number == this.card.number) {
            this.previousErrorRule = "number";
          } else {
            this.previousErrorRule = "color";
          }
        }
        break;
      case "number":
        if (element.number == this.card.number) {
          this.ruleCounter++;
          this.responses++;
          this.trial++;
          console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
          this.result = "Dobrze!";
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trial++;
          console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (this.completedCategories > 0 && element.form == this.card.form) {
            this.perservativeResponses++;
            console.log("pr: ", this.perservativeResponses);
          }
          if (element.color == this.card.color) {
            this.previousErrorRule = "color";
          } else {
            this.previousErrorRule = "form";
          }
        }
        break;
    }
    this.getRandomCard();
    if (this.ruleCounter == 10) {
      this.ruleCounter = 0;
      this.completedCategories++;
      if (this.completedCategories == 6) {
        this.isTestEnded = true;
        this.pause = true;
        clearInterval(this.intervalId);
        if (this.hour > 0)
          this.time = this.hour + "h " + this.minute + "m " + this.second + "s";
        else this.time = this.minute + "m " + this.second + "s";

        this.makeScoring();
      }
      console.log("ZMIANA REGUŁY! ruleCounter:", this.ruleCounter);
      this.getRandomRule();
    }
  }
  calculateTrialsToFirstCategory() {
    if (this.completedCategories < 1 && !this.isTestEnded) {
      this.trialsToFirstCategory++;
    }
    if (this.isTestEnded && this.completedCategories == 0) {
      this.trialsToFirstCategory = 129;
    }
  }
  calculateFailureToSet() {
    if (this.ruleCounter > 4 && this.ruleCounter < 10) {
      this.failureToSet++;
    }
  }
  calculateConceptualLevelResponse() {
    this.series++;
    if (this.series == 3) {
      this.conceptualLevelResponse = this.conceptualLevelResponse + 3;
    } else if (this.series > 3) {
      this.conceptualLevelResponse++;
    }
    //ToDo
  }
  checkPerseveration(element) {
    if (element.color == this.card.color && this.previousErrorRule == "color") {
      this.perservativeErrors = this.perservativeErrors + 1;
    } else if (
      element.number == this.card.number &&
      this.previousErrorRule == "number"
    ) {
      this.perservativeErrors = this.perservativeErrors + 1;
    } else if (
      element.form == this.card.form &&
      this.previousErrorRule == "form"
    ) {
      this.perservativeErrors = this.perservativeErrors + 1;
    } else {
      this.nonPerservativeErrors = this.nonPerservativeErrors + 1;
    }
  }
  makeScoring() {
    this.percentageOfPerservativeErrors = this.perservativeErrors / this.errors;
 this.percentageOfPerservativeErrors.toFixed(2)
    this.percentageOfResponses = this.responses / this.trial;
 this.percentageOfResponses.toFixed(2)

  }
  //   isCardRepeated() {
  //     if (JSON.stringify(this.card) === JSON.stringify(this.previousCard)) {
  //       console.log("KARTY SIE POWTORZYLY!!!!");

  //       this.getDeck();
  //     } else {
  //       this.previousCard = this.card;
  //     }
  //   }
  getRandomRule() {
    // this.ruleService.getRandomRule().subscribe(r => {
    //   this.rule = r;
    //   this.isRuleRepeated();
    //   this.isRuleChecked = true;
    // });
    switch (this.ruleName) {
      case "color":
        this.ruleName = "form";
        break;
      case "form":
        this.ruleName = "number";
        break;
      case "number":
        this.ruleName = "color";
        break;
    }
  }
  //   isRuleRepeated() {
  //     if (
  //       JSON.stringify(this.rule).toLowerCase() ===
  //       JSON.stringify(this.previousRule).toLowerCase()
  //     ) {
  //       this.getRandomRule();
  //     } else {
  //       this.previousRule = this.rule;
  //     }
  //   }
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
}
