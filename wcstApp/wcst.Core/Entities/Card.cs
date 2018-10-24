using System;
using System.Collections.Generic;
using System.Text;

namespace wcstApp.Core.Entities
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Numer { get; set; }
        public string Color { get; set; }
        public string Symbol { get; set; }
        public bool IsUsed { get; set; }
    }
}
