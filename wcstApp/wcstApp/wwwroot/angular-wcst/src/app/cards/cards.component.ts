import { Component, OnInit } from "@angular/core";
import { CardsModel } from "../service/CardsService/cards.model";
import { CardsService } from "../service/CardsService/cards.service";
import { RuleService } from "../service/RuleService/rule.service";
import { RuleModel } from "../service/RuleService/rule.model";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { formatDate, DatePipe } from "@angular/common";
import { ScoreModel } from "../service/CardsService/score.model";
import * as jspdf from "jspdf";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as html2canvas from "html2canvas/dist/html2canvas.js";
import * as rasterizeHTML from "rasterizehtml";
@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit {
  startingCards: Array<CardsModel> = [];
  card: CardsModel;
  deck: Array<CardsModel> = [];
  temp: number = 0;
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
  score: Array<ScoreModel> = [];
  scoreModel: ScoreModel = <ScoreModel>{};
  startDate: string;

  trials: number;
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
      window.screen.orientation.lock("portrait").catch(function(error) {
        // whatever
        console.log("mie mozna wyświetlić ");
      });
    }

    this.trials = 0;
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
    this.startDate = formatDate(date, "medium", "pl");

    var pdf = new jspdf("p", "pt", "a4");

    // pdf.addFileToVFS("PTSans.ttf", Lato);
    // pdf.addFont('PTSans.ttf', 'PTSans', 'normal');
    // pdf.addFileToVFS('Font.ttf', font);
    // pdf.addFont('Font.ttf', 'font', 'normal');
    // pdf.setFont('font');

    // pdf.text(20,20,"Test sortowania kard z Wisconsin ")
    // pdf.text(20,40,"Data: " + this.startDate)
    // pdf.text(20,60,"Czas trwania badania: " + this.time)
    // pdf.text(20,80, "Ilość prób: " + this.trials)
    // pdf.text(20,100,"Ilość odpowiedzi: " + this.responses)
    // pdf.text(20,120, "Ilość błędów: " + this.errors)
    // pdf.text(20,140,"Ilość błędów nieperseweracyjnych: " + this.nonPerservativeErrors)
    // pdf.text(20,160, "Ilość odpowiedzi perseweracyjnych: " + this.perservativeResponses)
    // pdf.text(20,180, "Procent odpowiedzi: " + this.percentageOfResponses)
    // pdf.text(20,200,"Procent błędów perseweracyjnych: " +
    // this.percentageOfPerservativeErrors.toFixed(2))
    // pdf.text(20,220, "Ilość ukończonych kategorii: " + this.completedCategories)
    // pdf.text(20,240,"Ilość błędów nieperseweracyjnych: " + this.nonPerservativeErrors)
    // pdf.text(20,260, "Ilość prób do ukończenia pierwszej kategorii: " +
    // this.trialsToFirstCategory)
    // pdf.text(20,280, "Conceptual Level Response: " + this.conceptualLevelResponse)
    // pdf.text(20,300,"Brak utrzymania zestawu: " + this.failureToSet)
    if (this.mobile) pdf.internal.scaleFactor = 1.7;
    else if (!this.mobile && window.screen.width > 1400)
      pdf.internal.scaleFactor = 3.2;
    else pdf.internal.scaleFactor = 2.5;

    pdf.addHTML(
      document.getElementById("exportthis"),
      10,
      15,
      {
        pagesplit: true,
        margin: { top: 10, right: 10, bottom: 10, left: 10, useFor: "page" }
      },
      function() {
        pdf.save("WCST_przebieg.pdf");
      }
    );
    var docDefinition = {
      content: [
        {
          text: "Raport z testu sortowania kard z Wisconsin ",
          style: "header"
        },
        " ",
        " ",
        { text: "Data wykonania testu : " + this.startDate, fontSize: 20 },
        " ",
        " ",
        " ",
        {
          layout: 'lightHorizontalLines',
          table: {
            body: [
              ["Czas trwania badania ", this.time],
              ["Liczba prób ", this.trials],
              ["Liczba odpowiedzi ", this.responses],
              ["Liczba błędów ", this.errors],
              ["Liczba błędów perseweracyjnych ", this.perservativeErrors],
              [
                "Liczba błędów nieperseweracyjnych ",
                this.nonPerservativeErrors
              ],
              [
                "Liczba odpowiedzi perseweracyjnych ",
                this.perservativeResponses
              ],
              ["Procent odpowiedzi ", this.percentageOfResponses.toFixed(2)],
              [
                "Procent błędów perseweracyjnych ",
                this.percentageOfPerservativeErrors.toFixed(2)
              ],
              ["Liczba ukończonych kategorii ", this.completedCategories],
              [
                "Liczba prób do ukończenia pierwszej kategorii ",
                this.trialsToFirstCategory
              ],
              ["Conceptual Level Response ", this.conceptualLevelResponse],
              ["Brak utrzymania zestawu ", this.failureToSet]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center"
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download("WCST_wyniki");
  }
  newTest() {
    window.location.reload();
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
    if (this.deck.length > 0) {
      this.card = this.deck.pop();
      this.temp++;
      //
      this.deck.pop();
      this.deck.pop();
      this.deck.pop();
      console.log("talia", this.deck.length);
    } else {
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
    this.scoreModel = <ScoreModel>{};
    this.scoreModel.selectedCard = element.imgbase;
    this.scoreModel.comment = "";
    this.scoreModel.sortedCard = this.card.imgbase;
    switch (this.ruleName) {
      case "color":
        this.scoreModel.correctRule = "Kolor";
        if (element.color == this.card.color) {
          this.ruleCounter++;
          this.responses++;
          this.trials++;
          //  console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
          this.scoreModel.appliedRule = "Kolor";
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trials++;
          //    console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (
            this.completedCategories > 0 &&
            element.number == this.card.number
          ) {
            this.perservativeResponses++;
            this.scoreModel.comment += "odpowiedź perseweracyjna ";
            //   console.log("pr: ", this.perservativeResponses);
          }
          if (element.number == this.card.number) {
            this.previousErrorRule = "number";
            this.scoreModel.appliedRule = "Liczba";
          } else if (element.form == this.card.form) {
            this.previousErrorRule = "form";
            this.scoreModel.appliedRule = "Kształt";
          }
          this.checkPerseveration(element);
        }
        break;
      case "form":
        this.scoreModel.correctRule = "Kształt";
        if (element.form == this.card.form) {
          this.ruleCounter++;
          this.responses++;
          this.trials++;
          this.scoreModel.appliedRule = "Kształt";
          //  console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.result = "Dobrze!";
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trials++;
          //  console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (
            this.completedCategories > 0 &&
            element.color == this.card.color
          ) {
            this.perservativeResponses++;
            this.scoreModel.comment += "odpowiedź perseweracyjna ";
            //   console.log("pr: ", this.perservativeResponses);
          }
          if (element.number == this.card.number) {
            this.previousErrorRule = "number";
            this.scoreModel.appliedRule = "Liczba";
          } else if (element.color == this.card.color) {
            this.scoreModel.appliedRule = "Kolor";
            this.previousErrorRule = "color";
          }
          this.checkPerseveration(element);
        }
        break;
      case "number":
        this.scoreModel.correctRule = "Liczba";
        if (element.number == this.card.number) {
          this.ruleCounter++;
          this.responses++;
          this.trials++;
          this.scoreModel.appliedRule = "Liczba";
          //  console.log("DOBRZE! ruleCounter:", this.ruleCounter);
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
          this.result = "Dobrze!";
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trials++;
          //console.log("ZLE! mistakeCounter:", this.errors);
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (this.completedCategories > 0 && element.form == this.card.form) {
            this.perservativeResponses++;
            this.scoreModel.comment += "odpowiedź perseweracyjna ";
            //console.log("pr: ", this.perservativeResponses);
          }
          if (element.color == this.card.color) {
            this.previousErrorRule = "color";
            this.scoreModel.appliedRule = "Kolor";
          } else if (element.form == this.card.form) {
            this.previousErrorRule = "form";
            this.scoreModel.appliedRule = "Kształ";
          }
          this.checkPerseveration(element);
        }
        break;
    }
    this.scoreModel.feedback = this.result;
    this.scoreModel.trial = this.trials;
    this.scoreModel.sequenceCorrect = this.ruleCounter;
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
    console.log(this.scoreModel);
    this.score.push(this.scoreModel);
    console.log(this.score);
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
      this.scoreModel.comment += "błąd perseweracyjny ";
    } else if (
      element.number == this.card.number &&
      this.previousErrorRule == "number"
    ) {
      this.perservativeErrors = this.perservativeErrors + 1;
      this.scoreModel.comment += "błąd perseweracyjny ";
    } else if (
      element.form == this.card.form &&
      this.previousErrorRule == "form"
    ) {
      this.perservativeErrors = this.perservativeErrors + 1;
      this.scoreModel.comment += "błąd perseweracyjny ";
    } else {
      this.nonPerservativeErrors = this.nonPerservativeErrors + 1;
    }
  }
  makeScoring() {
    this.percentageOfPerservativeErrors = this.perservativeErrors / this.trials;
    this.percentageOfPerservativeErrors.toFixed(2);
    this.percentageOfResponses = this.responses / this.trials;
    this.percentageOfResponses.toFixed(2);
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
