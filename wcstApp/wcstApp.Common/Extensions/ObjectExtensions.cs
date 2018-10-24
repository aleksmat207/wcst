using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections;

namespace wcstApp.Common
{
    public static class ObjectExntensions
    {
        public static JContainer AsJContainer(this object o)
        {
            var serializer = new JsonSerializer
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };

            if (o is IEnumerable)
                return JArray.FromObject(o, serializer);

            return JObject.FromObject(o, serializer);
        }
    }
}
