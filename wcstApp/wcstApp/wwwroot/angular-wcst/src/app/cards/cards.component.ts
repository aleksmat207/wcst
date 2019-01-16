import { Component, OnInit } from "@angular/core";
import { CardsModel } from "../service/CardsService/cards.model";
import { CardsService } from "../service/CardsService/cards.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { formatDate, DatePipe } from "@angular/common";
import { ScoreModel } from "../service/CardsService/score.model";
import * as jspdf from "jspdf";
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
  temp: number = 0;
  instruction: boolean;
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
  percentageOfPerservativeResponses: number;
  percentageOfNonpeservativeErrors: number;
  percentageOfCLR: number;
  learningToLearn: number;
  percentageOfPerservativeErrors: number;
  failureToSet: number;
  trialsToFirstCategory: number;
  series: number;
  conceptualLevelResponse: number;
  percentageOfErrors: number;
  //stopwatch:

  x: number;
  intervalId;
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  pause = false;

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    if (window.screen.width < 1024) {
      this.mobile = true;
      // screen.orientation.lock("portrait").catch(function(error) {
      //   console.log("mie mozna wyświetlić ");
      //});
    }
    this.instruction = false;
    this.percentageOfErrors = 0;
    this.percentageOfPerservativeResponses = 0;
    this.percentageOfNonpeservativeErrors = 0;
    this.percentageOfCLR = 0;
    this.learningToLearn = 0;
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
  getStimulsCards() {
    this.cardsService.getStimulsCards().subscribe(r => {
      this.startingCards = r;
      this.isStarted = true;
      this.instruction = false;
      this.onStartStopwatch();
      let date = new Date();
      this.startDate = formatDate(date, "medium", "pl");
    });
  }
  showInstruction() {
    this.instruction = true;
  }

  makePdf() {
    let date = new Date();
    this.startDate = formatDate(date, "medium", "pl");
    var pdf = new jspdf("p", "pt", "a4");
    if (this.mobile) pdf.internal.scaleFactor = 1.7;
    else if (!this.mobile && window.screen.width > 1400)
      pdf.internal.scaleFactor = 3.2;
    else pdf.internal.scaleFactor = 2.5;

    pdf.addHTML(
      document.getElementById("exportthis"),
      10,
      0,
      {
        pagesplit: true,
        margin: { top: 0, right: 10, bottom: 0, left: 10, useFor: "page" }
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
          layout: "lightHorizontalLines",
          table: {
            body: [
              ["Czas trwania badania ", this.time],
              ["Liczba przeprowadzonych prób ", this.trials],
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
              ["Procent błędów ", this.percentageOfErrors.toFixed(2) + "%"],
              [
                "Procent błędów perseweracyjnych ",
                this.percentageOfPerservativeErrors.toFixed(2) + "%"
              ],
              [
                "Procent odpowiedzi perseweracyjnych ",
                this.percentageOfPerservativeResponses.toFixed(2) + "%"
              ],
              [
                "Procent błędów nieperseweracyjnych ",
                this.percentageOfNonpeservativeErrors.toFixed(2) + "%"
              ],
              ["Liczba ukończonych kategorii ", this.completedCategories],
              [
                "Próby przeprowadzone do momentu zaliczenia pierwszej kategorii ",
                this.trialsToFirstCategory
              ],
              ["Liczba odpowiedzi pojęciowych ", this.conceptualLevelResponse],
              [
                "Procent odpowiedzi pojęciowych ",
                this.percentageOfCLR.toFixed(2) + "%"
              ],
              ["Liczba porażek w utrzymaniu nastawienia ", this.failureToSet]
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
      this.deck = r;
    });
  }
  getRandomCard() {
    if (this.deck.length > 0) {
      this.card = this.deck.pop();
      this.temp++;
    } else {
      this.isTestEnded = true;
      this.pause = true;
      clearInterval(this.intervalId);
      if (this.hour > 0)
        this.time = this.hour + "h " + this.minute + "m " + this.second + "s";
      else this.time = this.minute + "m " + this.second + "s";

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
          this.result = "Dobrze!";
          this.scoreModel.appliedRule = "Kolor";
          if (
            this.completedCategories > 0 &&
            element.number == this.card.number
          ) {
            this.perservativeResponses++;
            this.scoreModel.comment += "odpowiedź perseweracyjna ";
          }
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trials++;
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (
            this.completedCategories > 0 &&
            element.number == this.card.number
          ) {
            this.perservativeErrors++;
            this.perservativeResponses++;
            this.scoreModel.comment +=
              "błąd perseweracyjny, odpowiedź perseweracyjna ";
          } else {
            this.nonPerservativeErrors++;
            this.scoreModel.comment += "błąd nieperseweracyjny ";
          }
          if (element.number == this.card.number) {
            this.previousErrorRule = "number";
            this.scoreModel.appliedRule = "Liczba";
          } else if (element.form == this.card.form) {
            this.previousErrorRule = "form";
            this.scoreModel.appliedRule = "Kształt";
          }
        }
        break;
      case "form":
        this.scoreModel.correctRule = "Kształt";
        if (element.form == this.card.form) {
          this.ruleCounter++;
          this.responses++;
          this.trials++;
          this.scoreModel.appliedRule = "Kształt";
          this.result = "Dobrze!";
          if (
            this.completedCategories > 0 &&
            element.color == this.card.color
          ) {
            this.perservativeResponses++;
            this.scoreModel.comment += "odpowiedź perseweracyjna ";
          }
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trials++;
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (
            this.completedCategories > 0 &&
            element.color == this.card.color
          ) {
            this.perservativeErrors++;
            this.perservativeResponses++;
            this.scoreModel.comment +=
              "błąd perseweracyjny, odpowiedź perseweracyjna ";
          } else {
            this.nonPerservativeErrors++;
            this.scoreModel.comment += "błąd nieperseweracyjny ";
          }
          if (element.number == this.card.number) {
            this.previousErrorRule = "number";
            this.scoreModel.appliedRule = "Liczba";
          } else if (element.color == this.card.color) {
            this.scoreModel.appliedRule = "Kolor";
            this.previousErrorRule = "color";
          }
        }
        break;
      case "number":
        this.scoreModel.correctRule = "Liczba";
        if (element.number == this.card.number) {
          this.ruleCounter++;
          this.responses++;
          this.trials++;
          this.scoreModel.appliedRule = "Liczba";
          if (this.completedCategories > 0 && element.form == this.card.form) {
            this.perservativeResponses++;
            this.scoreModel.comment += "odpowiedź perseweracyjna ";
          }
          this.calculateTrialsToFirstCategory();
          this.calculateConceptualLevelResponse();
          this.result = "Dobrze!";
        } else {
          this.errors++;
          this.calculateFailureToSet();
          this.ruleCounter = 0;
          this.series = 0;
          this.trials++;
          this.result = "Źle!";
          this.calculateTrialsToFirstCategory();
          if (this.completedCategories > 0 && element.form == this.card.form) {
            this.perservativeResponses++;
            this.perservativeErrors++;
            this.scoreModel.comment +=
              "błąd perseweracyjny, odpowiedź perseweracyjna ";
          } else {
            this.nonPerservativeErrors++;
            this.scoreModel.comment += "błąd nieperseweracyjny ";
          }
          if (element.color == this.card.color) {
            this.previousErrorRule = "color";
            this.scoreModel.appliedRule = "Kolor";
          } else if (element.form == this.card.form) {
            this.previousErrorRule = "form";
            this.scoreModel.appliedRule = "Kształ";
          }
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
      this.scoreModel.comment += "ukończono kategorię ";
      if (this.completedCategories == 6) {
        this.isTestEnded = true;
        this.pause = true;
        clearInterval(this.intervalId);
        if (this.hour > 0)
          this.time = this.hour + "h " + this.minute + "m " + this.second + "s";
        else this.time = this.minute + "m " + this.second + "s";
        this.makeScoring();
      }
      this.getNextRule();
    }
    this.score.push(this.scoreModel);
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
      this.scoreModel.comment += "porażka w utrzymaniu nastawienia ";
    }
  }
  calculateConceptualLevelResponse() {
    this.series++;
    if (this.series == 3) {
      this.conceptualLevelResponse = this.conceptualLevelResponse + 3;
    } else if (this.series > 3) {
      this.conceptualLevelResponse++;
    }
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
    this.percentageOfPerservativeErrors =
      (this.perservativeErrors / this.trials) * 100;
    this.percentageOfPerservativeErrors.toFixed(2);
    this.percentageOfResponses = (this.responses / this.trials) * 100;
    this.percentageOfResponses.toFixed(2);
    this.percentageOfErrors = (this.errors / this.trials) * 100;
    this.percentageOfPerservativeResponses =
      (this.perservativeResponses / this.trials) * 100;
    this.percentageOfNonpeservativeErrors =
      (this.nonPerservativeErrors / this.trials) * 100;
    this.percentageOfCLR = (this.conceptualLevelResponse / this.trials) * 100;
  }
  getNextRule() {
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
