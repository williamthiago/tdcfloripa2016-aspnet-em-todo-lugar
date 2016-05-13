using System;
using Microsoft.AspNetCore.Mvc;

namespace TDC.AspNetCore.Web.Controllers
{
    [Route("/api/os")]
    public class OSController
    {
        [HttpGet]
        [Route("version")]
        public IActionResult GetVersion()
        {
            var result = new { OSDescription = System.Runtime.InteropServices.RuntimeInformation.OSDescription };
            return new OkObjectResult(result);
        }
    }
}