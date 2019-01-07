using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using wcstApp.API.Attributes;
using wcstApp.Services.CardService;
using Newtonsoft.Json.Linq;

namespace wcstApp.Controllers
{
    [Route("api/[controller]")]
    [ExceptionHandler]
    public class CardController : Controller
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }
        [HttpGet, Route("start")]
        public dynamic GetStimulsCards()
        {
            return _cardService.GetStimulsCards();
        }
        [HttpGet, Route("send")]
        public IList<CardModel> CreateStimulsCards()
        {
            return _cardService.CreateStimulsCards();
        }
        [HttpGet, Route("sendrandom")]
        public IList<CardModel> CreateDeck()
        {
            return _cardService.CreateDeck();
        }
        [HttpGet, Route("random")]
        public dynamic GetShuffledDeck()
        {
            return _cardService.GetShuffledDeck();
        }
    }
}
