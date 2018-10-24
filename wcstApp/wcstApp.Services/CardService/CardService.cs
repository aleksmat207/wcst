
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using wcstApp.Common;

namespace wcstApp.Services.CardService
{
    public class CardService: ICardService
    {
        private readonly HttpContext _httpContext;

        public CardService( IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }
        public JContainer PostStartingCards()
        {
            return new
            {
                imglbase= "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KCSBpZD0ic3ZnMzAzNSIgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC4yIHI5ODE5IiBzb2RpcG9kaTpkb2NuYW1lPSIxY2lyY2xlQmx1ZS5zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOm9zYj0iaHR0cDovL3d3dy5vcGVuc3dhdGNoYm9vay5vcmcvdXJpLzIwMDkvb3NiIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1OTUuMyA4NDEuOSINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTk1LjMgODQxLjk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI + DQoJLnN0MHtmaWxsOiMwMDAwRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjIuMDgzNjt9DQo8L3N0eWxlPg0KPHNvZGlwb2RpOm5hbWVkdmlldyAgYm9yZGVyY29sb3I9IiM2NjY2NjYiIGJvcmRlcm9wYWNpdHk9IjEuMCIgaWQ9ImJhc2UiIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIgaW5rc2NhcGU6Y3g9Ii00LjcxNzIzNDMiIGlua3NjYXBlOmN5PSI1NjMuMzUxNDYiIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgaW5rc2NhcGU6c25hcC1nbG9iYWw9ImZhbHNlIiBpbmtzY2FwZTpzbmFwLW9iamVjdC1taWRwb2ludHM9InRydWUiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk3MSIgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjgwIiBpbmtzY2FwZTp3aW5kb3cteD0iMTkxMSIgaW5rc2NhcGU6d2luZG93LXk9IjE2IiBpbmtzY2FwZTp6b29tPSIwLjciIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgc2hvd2dyaWQ9InRydWUiPg0KCTxpbmtzY2FwZTpncmlkICBpZD0iZ3JpZDMwNDYiIHR5cGU9Inh5Z3JpZCI + PC9pbmtzY2FwZTpncmlkPg0KPC9zb2RpcG9kaTpuYW1lZHZpZXc + DQo8ZyBpZD0ibGF5ZXIxIiBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSI + DQoJDQoJCTxwYXRoIGlkPSJwYXRoMzA0MSIgc29kaXBvZGk6Y3g9IjM3NC4yODU3MSIgc29kaXBvZGk6Y3k9IjUyNi42NDc4OSIgc29kaXBvZGk6cng9IjEyMCIgc29kaXBvZGk6cnk9IjExNy4xNDI4NSIgc29kaXBvZGk6dHlwZT0iYXJjIiBjbGFzcz0ic3QwIiBkPSINCgkJTTQzOC44LDQyMC45YzAsNzcuOS02My4yLDE0MS4xLTE0MS4xLDE0MS4xcy0xNDEuMS02My4yLTE0MS4xLTE0MS4xczYzLjItMTQxLjEsMTQxLjEtMTQxLjFTNDM4LjgsMzQzLDQzOC44LDQyMC45TDQzOC44LDQyMC45eiINCgkJLz4NCjwvZz4NCjwvc3ZnPg0KPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KCSBpZD0ic3ZnMzAzNSIgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC4yIHI5ODE5IiBzb2RpcG9kaTpkb2NuYW1lPSIxY2lyY2xlQmx1ZS5zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOm9zYj0iaHR0cDovL3d3dy5vcGVuc3dhdGNoYm9vay5vcmcvdXJpLzIwMDkvb3NiIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1OTUuMyA4NDEuOSINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTk1LjMgODQxLjk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI + DQoJLnN0MHtmaWxsOiMwMDAwRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjIuMDgzNjt9DQo8L3N0eWxlPg0KPHNvZGlwb2RpOm5hbWVkdmlldyAgYm9yZGVyY29sb3I9IiM2NjY2NjYiIGJvcmRlcm9wYWNpdHk9IjEuMCIgaWQ9ImJhc2UiIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIgaW5rc2NhcGU6Y3g9Ii00LjcxNzIzNDMiIGlua3NjYXBlOmN5PSI1NjMuMzUxNDYiIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgaW5rc2NhcGU6c25hcC1nbG9iYWw9ImZhbHNlIiBpbmtzY2FwZTpzbmFwLW9iamVjdC1taWRwb2ludHM9InRydWUiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk3MSIgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjgwIiBpbmtzY2FwZTp3aW5kb3cteD0iMTkxMSIgaW5rc2NhcGU6d2luZG93LXk9IjE2IiBpbmtzY2FwZTp6b29tPSIwLjciIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgc2hvd2dyaWQ9InRydWUiPg0KCTxpbmtzY2FwZTpncmlkICBpZD0iZ3JpZDMwNDYiIHR5cGU9Inh5Z3JpZCI + PC9pbmtzY2FwZTpncmlkPg0KPC9zb2RpcG9kaTpuYW1lZHZpZXc + DQo8ZyBpZD0ibGF5ZXIxIiBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSI + DQoJDQoJCTxwYXRoIGlkPSJwYXRoMzA0MSIgc29kaXBvZGk6Y3g9IjM3NC4yODU3MSIgc29kaXBvZGk6Y3k9IjUyNi42NDc4OSIgc29kaXBvZGk6cng9IjEyMCIgc29kaXBvZGk6cnk9IjExNy4xNDI4NSIgc29kaXBvZGk6dHlwZT0iYXJjIiBjbGFzcz0ic3QwIiBkPSINCgkJTTQzOC44LDQyMC45YzAsNzcuOS02My4yLDE0MS4xLTE0MS4xLDE0MS4xcy0xNDEuMS02My4yLTE0MS4xLTE0MS4xczYzLjItMTQxLjEsMTQxLjEtMTQxLjFTNDM4LjgsMzQzLDQzOC44LDQyMC45TDQzOC44LDQyMC45eiINCgkJLz4NCjwvZz4NCjwvc3ZnPg0K"
            }.AsJContainer();
        }
        public async Task <dynamic> GetStartingCards()
        {
            WebRequest wr = WebRequest.Create("http://localhost:59308/test");
            WebResponse res = wr.GetResponse();
            dynamic images;
            using (StreamReader reader = new StreamReader(res.GetResponseStream()))
            {
                string json = reader.ReadToEnd();
               images = JsonConvert.DeserializeObject(json);
                //  this.pictureBox1.Load(images["0"].imglink.Value);
            }
            // return images["0"].imglink.Value;
            return images["0"].imgbase;
        }
        public async Task <dynamic> GetRandomCard()
        {
            //Random rand = new Random();
            //int toSkip = rand.Next(1, 64);
            WebRequest wr = WebRequest.Create("http://pixplorer.co.uk/getimage/");
            WebResponse res = wr.GetResponse();
            dynamic images;
            using (StreamReader reader = new StreamReader(res.GetResponseStream()))
            {
                string json = reader.ReadToEnd();
                images = JsonConvert.DeserializeObject(json);
                //  this.pictureBox1.Load(images["0"].imglink.Value);
            }
            return images["0"];

        }
    }
}
