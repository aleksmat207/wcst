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
    [ExceptionHandler]
    public class RuleController : Controller
    {
        private readonly IRuleService _ruleService;

        public RuleController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }
        [HttpGet, Route("random")]
        public async Task<JContainer> GetRandomRule()
        {
            return await _ruleService.GetRandomRule();
        }
        [HttpGet] 
        public async Task<IList<RuleModel>> SendRandomRule()
        {
            return await _ruleService.SendRandomRule();
        }
    }
}