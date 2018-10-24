using System;
using System.Collections.Generic;
using System.Text;

namespace wcstApp.Common.Exceptions
{
    public class ResourceNotFoundException : Exception
    {
        public ResourceNotFoundException(string message) : base(message)
        {
        }
    }
}
