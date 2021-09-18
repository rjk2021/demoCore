using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message?? GetMessageforStatusCode(statusCode);
        }

        private string GetMessageforStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                
                400=>"A bad request ,you have made",
                401=>"Authorised , you are not",
                404=>"Resource , is was not",
                500=>"Errors are path to dark side ",
                _=>null
            };
        }

        public int StatusCode { get; set; }

        public string  Message { get; set; }
    }
}