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
        public async Task <dynamic> GetStartingCards()
        {
            return await _cardService.GetStartingCards();
        }
        [HttpGet, Route("send")]
        public async Task <IList<CardModel>> SendStartingCards()
        {
            return await _cardService.SendStartingCards();
        }
        [HttpGet, Route("sendrandom")]
        public async Task<IList<CardModel>> SendRandomCard()
        {
            return await _cardService.SendRandomCard();
        }
        [HttpGet, Route("abc")]
        public string ABC()
        {
            return "abc";
        }
        [HttpGet, Route("random")]
        public async Task <dynamic> GettRandomCards()
        {
            return await _cardService.GetRandomCard();
        }
    }
}
