using System;
using System.Collections.Generic;
using System.Text;

namespace wcstApp.Common.Exceptions
{
    public class InvalidParameterException : Exception
    {
        public InvalidParameterException(string message) : base(message)
        {
        }
    }
}
