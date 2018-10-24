using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wcstApp.API.Attributes;
using wcstApp.Services.RuleService;

namespace wcstApp.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ExceptionHandler]
    public class RuleController : Controller
    {
        private readonly IRuleService _ruleService;

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }
        //[HttpGet]

        //public async Task<JContainer> GetRandomRule()
        //{
        //    return await _ruleService.GetRandomRule();
        //}
    }
}