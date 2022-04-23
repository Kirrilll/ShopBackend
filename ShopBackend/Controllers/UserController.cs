using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Domain.Repositories;
using ShopBackend.Models;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("authorize")]
        public ActionResult Authorization([FromBody] AuthorizationRequest request)
        {
            var result = _userRepository.Auth(request);
            if (result == null)
            {
                //return new AuthResponse(false, null);
                return NotFound();
            }
            //return new AuthResponse(true, result);
            return Ok(result);
        }

        [HttpPost("register")] 
        public async Task<ActionResult> Registration([FromBody] AuthorizationRequest request)
        {
            if (request == null)
            {
                //return new AuthorizationResponse(false, null);
                return BadRequest();
            }
            var result = await _userRepository.Registration(request.BuildUser());
            if (result == null)
            {
                //return new AuthorizationResponse(false, null);
                return NotFound();
            }
            //return new AuthorizationResponse(true, result);
            return Ok(result);
           
        }

    }
}
