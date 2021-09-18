using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundStatus()
        {
            var things = _context.Products.Find(42);

            if (things == null)
            {
                return NotFound(new ApiResponse(404));

            }


            return Ok();
        }
        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var things = _context.Products.Find(42);
            var notThingToReturn = things.ToString();
            return Ok();
        }
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
           
            return BadRequest(new ApiResponse(404));
        }
         [HttpGet("badrequest/{id}")]
        public ActionResult GotNotFoundRequest()
        {
           
            return Ok();
        }
    }
}