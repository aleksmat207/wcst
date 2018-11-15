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
                new RuleModel() {Name= "amount"},
                new RuleModel() {Name= "sign"}
              };
            return result;
        }
        public async Task<dynamic> GetRandomRule()
        {
            Random rand = new Random();
            int toSkip = rand.Next(0, 2);
            WebRequest wr = WebRequest.Create("http://localhost:59308/api/Rule/");
            WebResponse res = wr.GetResponse();
            dynamic rules;
            using (StreamReader reader = new StreamReader(res.GetResponseStream()))
            {
                string json = reader.ReadToEnd();
                rules = JsonConvert.DeserializeObject(json);
                //  this.pictureBox1.Load(images["0"].imglink.Value);
            }
            return rules[toSkip];

        }
    }
}
