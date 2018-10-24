using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace wcstApp.Services.RuleService
{
    public interface IRuleService
    {
        Task GetRandomRule();
    }
}
