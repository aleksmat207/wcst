using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;


using System.Threading.Tasks;
using wcstApp.Common.Exceptions;
using wcstApp.Common.Extensions;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace wcstApp.API.Attributes
{
    public class ExceptionHandlerAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exceptionMessage = context.Exception.GetFullMessage();
            var errorModel = new ApiErrorModel
            {
                Message = exceptionMessage
            };

            var result = new JsonResult(errorModel);
            switch (context.Exception.GetType().Name)
            {
                case nameof(ResourceNotFoundException):
                    result.StatusCode = (int)HttpStatusCode.NotFound;
                    break;

                case nameof(InvalidParameterException):
                    result.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;

                default:
                    result.StatusCode = (int)HttpStatusCode.InternalServerError;
                    errorModel.StackTrace = context.Exception.StackTrace;
                    break;
            }
            context.Result = result;
            context.ExceptionHandled = true;
        }
    }

    class ApiErrorModel
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }
}
