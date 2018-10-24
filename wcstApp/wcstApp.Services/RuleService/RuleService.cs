using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wcstApp.Common;

namespace wcstApp.Services.RuleService
{
    public class RuleService: IRuleService
    {
        private readonly HttpContext _httpContext;

        public RuleService( IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }
        public async Task GetRandomRule()
        {
            Random rand = new Random();
            int toSkip = rand.Next(1, 3);
        }
    }
}
