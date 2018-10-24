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
    [Authorize]
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
        [HttpGet, Route("test")]
        public JContainer PostStartingCards()
        {
            return  _cardService.PostStartingCards();
        }
        [HttpGet]
        public async Task <dynamic> GettRandomCards()

        {
            return await _cardService.GetRandomCard();
        }
    }
}
