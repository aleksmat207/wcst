
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using wcstApp.Common;

namespace wcstApp.Services.CardService
{
    public class CardService : ICardService
    {
        private readonly HttpContext _httpContext;

        public IList<CardModel> CreateStimulsCards()
        {
            IList<CardModel> result = new List<CardModel>()
            {
               new CardModel(){
                   Imgbase ="assets/cards/1squareRed.png",
                   Color ="red",
               Number=1,
               Form="square"},
               new CardModel(){
                   Imgbase="assets/cards/2starGreen.png",
                   Color ="green",
               Form="star",
               Number=2},
               new CardModel(){
                   Imgbase="assets/cards/3crossYellow.png",
                   Color ="yellow",
               Form="cross",
               Number=3
               },
               new CardModel(){
                   Imgbase="assets/cards/4circleBlue.png",
                   Color ="blue",
               Number=4,
               Form="circle"
               }

            };
            return result;
        }
        public dynamic GetStimulsCards()
        {
            WebRequest wr = WebRequest.Create("http://localhost:59308/api/Card/send");
            WebResponse res = wr.GetResponse();
            dynamic images;
            using (StreamReader reader = new StreamReader(res.GetResponseStream()))
            {
                string json = reader.ReadToEnd();
                images = JsonConvert.DeserializeObject(json);
                //  this.pictureBox1.Load(images["0"].imglink.Value);
            }
            // return images.imglink.Value;
            return images;
        }
        public IList<CardModel> CreateDeck()
        {
            IList<CardModel> result = new List<CardModel>()
            {
                new CardModel() {Imgbase="assets/cards/1circleBlue.png",
                   Color ="blue",
               Number=1,
               Form="circle"},
                new CardModel() {Imgbase="assets/cards/1circleGreen.png",
                   Color ="green",
               Number=1,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/1circleYellow.png",
                   Color ="yellow",
               Number=1,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/1circleRed.png",
                   Color ="red",
               Number=1,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/1crossBlue.png",
                   Color ="blue",
               Number=1,
               Form="cross"
                },
                 new CardModel() {Imgbase="assets/cards/1crossGreen.png",
                   Color ="green",
               Number=1,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/1crossRed.png",
                   Color ="red",
               Number=1,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/1crossYellow.png",
                   Color ="yellow",
               Number=1,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/1squareBlue.png",
                   Color ="blue",
               Number=1,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/1squareGreen.png",
                   Color ="green",
               Number=1,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/1squareYellow.png",
                   Color ="yellow",
               Number=1,
               Form="square"
               },
                new CardModel() {Imgbase="assets/cards/1starBlue.png",
                   Color ="blue",
               Number=1,
               Form="star"},
                new CardModel() {Imgbase="assets/cards/1starGreen.png",
                   Color ="green",
               Number=1,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/1starRed.png",
                   Color ="red",
               Number=1,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/1starYellow.png",
                   Color ="yellow",
               Number=1,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/2circleBlue.png",
                   Color ="blue",
               Number=2,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/2circleGreen.png",
                   Color ="green",
               Number=2,
               Form="circle"
                },
                 new CardModel() {Imgbase="assets/cards/2circleRed.png",
                   Color ="red",
               Number=2,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/2circleYellow.png",
                   Color ="yellow",
               Number=2,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/2crossBlue.png",
                   Color ="blue",
               Number=2,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/2crossGreen.png",
                   Color ="green",
               Number=2,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/2crossRed.png",
                   Color ="red",
               Number=2,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/2crossYellow.png",
                   Color ="yellow",
               Number=2,
               Form="cross"
               },

                new CardModel() {Imgbase="assets/cards/2squareBlue.png",
                   Color ="blue",
               Number=2,
               Form="square"},
                new CardModel() {Imgbase="assets/cards/2squareGreen.png",
                   Color ="green",
               Number=2,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/2squareRed.png",
                   Color ="red",
               Number=2,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/2squareYellow.png",
                   Color ="yellow",
               Number=2,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/2starBlue.png",
                   Color ="blue",
               Number=2,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/2starRed.png",
                   Color ="red",
               Number=2,
               Form="star"
                },
                 new CardModel() {Imgbase="assets/cards/2starYellow.png",
                   Color ="yellow",
               Number=2,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3circleBlue.png",
                   Color ="blue",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3circleRed.png",
                   Color ="red",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3circleYellow.png",
                   Color ="yellow",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3circleGreen.png",
                   Color ="green",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3crossBlue.png",
                   Color ="blue",
               Number=3,
               Form="cross"
               },

                new CardModel() {Imgbase="assets/cards/3crossGreen.png",
                   Color ="green",
               Number=3,
               Form="cross"},
                new CardModel() {Imgbase="assets/cards/3crossRed.png",
                   Color ="red",
               Number=3,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/3squareBlue.png",
                   Color ="blue",
               Number=3,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/3squareGreen.png",
                   Color ="green",
               Number=3,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/3squareRed.png",
                   Color ="red",
               Number=3,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/3squareYellow.png",
                   Color ="yellow",
               Number=3,
               Form="square"
                },
                 new CardModel() {Imgbase="assets/cards/3starBlue.png",
                   Color ="blue",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3starGreen.png",
                   Color ="green",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3starRed.png",
                   Color ="red",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3starYellow.png",
                   Color ="yellow",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/4circleGreen.png",
                   Color ="green",
               Number=4,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/4circleRed.png",
                   Color ="red",
               Number=4,
               Form="circle"
               },
                 new CardModel() {Imgbase="assets/cards/4circleYellow.png",
                   Color ="yellow",
               Number=4,
               Form="circle"},
                new CardModel() {Imgbase="assets/cards/4crossBlue.png",
                   Color ="blue",
               Number=4,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/4crossGreen.png",
                   Color ="green",
               Number=4,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/4crossRed.png",
                   Color ="red",
               Number=4,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/4crossYellow.png",
                   Color ="yellow",
               Number=4,
               Form="cross"
                },
                 new CardModel() {Imgbase="assets/cards/4squareBlue.png",
                   Color ="blue",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4squareGreen.png",
                   Color ="green",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4squareRed.png",
                   Color ="red",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4squareYellow.png",
                   Color ="yellow",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4starBlue.png",
                   Color ="blue",
               Number=4,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/4starGreen.png",
                   Color ="green",
               Number=4,
               Form="star"
               },
                new CardModel() {Imgbase="assets/cards/4starRed.png",
                   Color ="red",
               Number=4,
               Form="star"},
                new CardModel() {Imgbase="assets/cards/4starYellow.png",
                   Color ="yellow",
               Number=4,
               Form="star"
                },
                 new CardModel() {Imgbase="assets/cards/1circleBlue.png",
                   Color ="blue",
               Number=1,
               Form="circle"},
                new CardModel() {Imgbase="assets/cards/1circleGreen.png",
                   Color ="green",
               Number=1,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/1circleYellow.png",
                   Color ="yellow",
               Number=1,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/1circleRed.png",
                   Color ="red",
               Number=1,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/1crossBlue.png",
                   Color ="blue",
               Number=1,
               Form="cross"
                },
                 new CardModel() {Imgbase="assets/cards/1crossGreen.png",
                   Color ="green",
               Number=1,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/1crossRed.png",
                   Color ="red",
               Number=1,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/1crossYellow.png",
                   Color ="yellow",
               Number=1,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/1squareBlue.png",
                   Color ="blue",
               Number=1,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/1squareGreen.png",
                   Color ="green",
               Number=1,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/1squareYellow.png",
                   Color ="yellow",
               Number=1,
               Form="square"
               },
                new CardModel() {Imgbase="assets/cards/1starBlue.png",
                   Color ="blue",
               Number=1,
               Form="star"},
                new CardModel() {Imgbase="assets/cards/1starGreen.png",
                   Color ="green",
               Number=1,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/1starRed.png",
                   Color ="red",
               Number=1,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/1starYellow.png",
                   Color ="yellow",
               Number=1,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/2circleBlue.png",
                   Color ="blue",
               Number=2,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/2circleGreen.png",
                   Color ="green",
               Number=2,
               Form="circle"
                },
                 new CardModel() {Imgbase="assets/cards/2circleRed.png",
                   Color ="red",
               Number=2,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/2circleYellow.png",
                   Color ="yellow",
               Number=2,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/2crossBlue.png",
                   Color ="blue",
               Number=2,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/2crossGreen.png",
                   Color ="green",
               Number=2,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/2crossRed.png",
                   Color ="red",
               Number=2,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/2crossYellow.png",
                   Color ="yellow",
               Number=2,
               Form="cross"
               },

                new CardModel() {Imgbase="assets/cards/2squareBlue.png",
                   Color ="blue",
               Number=2,
               Form="square"},
                new CardModel() {Imgbase="assets/cards/2squareGreen.png",
                   Color ="green",
               Number=2,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/2squareRed.png",
                   Color ="red",
               Number=2,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/2squareYellow.png",
                   Color ="yellow",
               Number=2,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/2starBlue.png",
                   Color ="blue",
               Number=2,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/2starRed.png",
                   Color ="red",
               Number=2,
               Form="star"
                },
                 new CardModel() {Imgbase="assets/cards/2starYellow.png",
                   Color ="yellow",
               Number=2,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3circleBlue.png",
                   Color ="blue",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3circleRed.png",
                   Color ="red",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3circleYellow.png",
                   Color ="yellow",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3circleGreen.png",
                   Color ="green",
               Number=3,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/3crossBlue.png",
                   Color ="blue",
               Number=3,
               Form="cross"
               },

                new CardModel() {Imgbase="assets/cards/3crossGreen.png",
                   Color ="green",
               Number=3,
               Form="cross"},
                new CardModel() {Imgbase="assets/cards/3crossRed.png",
                   Color ="red",
               Number=3,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/3squareBlue.png",
                   Color ="blue",
               Number=3,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/3squareGreen.png",
                   Color ="green",
               Number=3,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/3squareRed.png",
                   Color ="red",
               Number=3,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/3squareYellow.png",
                   Color ="yellow",
               Number=3,
               Form="square"
                },
                 new CardModel() {Imgbase="assets/cards/3starBlue.png",
                   Color ="blue",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3starGreen.png",
                   Color ="green",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3starRed.png",
                   Color ="red",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/3starYellow.png",
                   Color ="yellow",
               Number=3,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/4circleGreen.png",
                   Color ="green",
               Number=4,
               Form="circle"
                },
                new CardModel() {Imgbase="assets/cards/4circleRed.png",
                   Color ="red",
               Number=4,
               Form="circle"
               },
                 new CardModel() {Imgbase="assets/cards/4circleYellow.png",
                   Color ="yellow",
               Number=4,
               Form="circle"},
                new CardModel() {Imgbase="assets/cards/4crossBlue.png",
                   Color ="blue",
               Number=4,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/4crossGreen.png",
                   Color ="green",
               Number=4,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/4crossRed.png",
                   Color ="red",
               Number=4,
               Form="cross"
                },
                new CardModel() {Imgbase="assets/cards/4crossYellow.png",
                   Color ="yellow",
               Number=4,
               Form="cross"
                },
                 new CardModel() {Imgbase="assets/cards/4squareBlue.png",
                   Color ="blue",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4squareGreen.png",
                   Color ="green",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4squareRed.png",
                   Color ="red",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4squareYellow.png",
                   Color ="yellow",
               Number=4,
               Form="square"
                },
                new CardModel() {Imgbase="assets/cards/4starBlue.png",
                   Color ="blue",
               Number=4,
               Form="star"
                },
                new CardModel() {Imgbase="assets/cards/4starGreen.png",
                   Color ="green",
               Number=4,
               Form="star"
               },
                new CardModel() {Imgbase="assets/cards/4starRed.png",
                   Color ="red",
               Number=4,
               Form="star"},
                new CardModel() {Imgbase="assets/cards/4starYellow.png",
                   Color ="yellow",
               Number=4,
               Form="star"
                }, new CardModel(){
                   Imgbase ="assets/cards/1squareRed.png",
                   Color ="red",
               Number=1,
               Form="square"},
               new CardModel(){
                   Imgbase="assets/cards/2starGreen.png",
                   Color ="green",
               Form="star",
               Number=2},
               new CardModel(){
                   Imgbase="assets/cards/3crossYellow.png",
                   Color ="yellow",
               Form="cross",
               Number=3
               },
               new CardModel(){
                   Imgbase="assets/cards/4circleBlue.png",
                   Color ="blue",
               Number=4,
               Form="circle"
               },
                new CardModel(){
                   Imgbase ="assets/cards/1squareRed.png",
                   Color ="red",
               Number=1,
               Form="square"},
               new CardModel(){
                   Imgbase="assets/cards/2starGreen.png",
                   Color ="green",
               Form="star",
               Number=2},
               new CardModel(){
                   Imgbase="assets/cards/3crossYellow.png",
                   Color ="yellow",
               Form="cross",
               Number=3
               },
               new CardModel(){
                   Imgbase="assets/cards/4circleBlue.png",
                   Color ="blue",
               Number=4,
               Form="circle"
               }

            };
            return result;
        }
        public dynamic GetShuffledDeck()
        {
            //Random rand = new Random();
            ////63
            //int toSkip = rand.Next(0, 60);
            WebRequest wr = WebRequest.Create("http://localhost:59308/api/Card/sendrandom");
            WebResponse res = wr.GetResponse();
            dynamic images;
            using (StreamReader reader = new StreamReader(res.GetResponseStream()))
            {
                string json = reader.ReadToEnd();
                images = JsonConvert.DeserializeObject(json);
                //  this.pictureBox1.Load(images["0"].imglink.Value);
            }
            Queue<object> randomizedList = new Queue<object>();
            Random rnd = new Random();
            while (images.Count > 0)
            {
                int index = rnd.Next(0, images.Count); //pick a random item from the master list
                randomizedList.Enqueue(images[index]); //place it at the end of the randomized list
                images.RemoveAt(index);
            }

            //  return images[toSkip];
            return randomizedList;
        }
      
    }

}

