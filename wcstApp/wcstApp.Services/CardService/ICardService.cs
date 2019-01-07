using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace wcstApp.Services.CardService
{
    public interface ICardService
    {
      dynamic GetShuffledDeck();
      dynamic  GetStimulsCards();
       IList<CardModel> CreateStimulsCards();
       IList<CardModel> CreateDeck();
    }
}
