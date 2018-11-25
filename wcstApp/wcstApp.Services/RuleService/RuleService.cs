using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using wcstApp.Common;

namespace wcstApp.Services.RuleService
{
    public class RuleService: IRuleService
    {
        private readonly HttpContext _httpContext;

        public async Task<IList<RuleModel>> SendRandomRule()
        {
            IList<RuleModel> result = new List<RuleModel>()
            {
                new RuleModel() {Name= "color"},
                new RuleModel() {Name= "number"},
                new RuleModel() {Name= "form"}
              };
            return result;
        }
        public async Task<dynamic> GetRandomRule()
        {
            Random rand = new Random();
            int toSkip = rand.Next(0, 3);
            WebRequest wr = WebRequest.Create("http://localhost:59308/api/Rule/");
            WebResponse res = wr.GetResponse();
            dynamic rules;
            using (StreamReader reader = new StreamReader(res.GetResponseStream()))
            {
                string json = reader.ReadToEnd();
                rules = JsonConvert.DeserializeObject(json);
            }
            return rules[toSkip];

        }
    }
}
