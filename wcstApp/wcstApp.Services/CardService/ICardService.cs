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
        Task <dynamic> GetRandomCard();
        Task <dynamic>  GetStartingCards();
        Task <IList<CardModel>> SendStartingCards();
        Task<IList<CardModel>> SendRandomCard();
    }
}
