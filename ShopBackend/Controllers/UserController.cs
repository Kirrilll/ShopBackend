using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Domain.Entities;
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
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost("register")] 
        public async Task<ActionResult> Registration([FromBody] AuthorizationRequest request)
        {
            if (request == null) return BadRequest();
            var result = await _userRepository.Registration(request.BuildUser());
            if (result == null)  return NotFound();
            return Ok(result);
           
        }

        [HttpPut("{id}/{isAdmin}")]
        public async Task<ActionResult> SetAdmin(int id, bool isAdmin)
        {
            var user = _userRepository.GetById(id);
            if (user == null) return NotFound();
            user.IsAdmin = isAdmin;
            await _userRepository.Update(user);  
            return Ok(user);
        }

        [HttpGet]
        public async Task<IEnumerable<UserResponse>> GetAll()
        {
            var users = await _userRepository.GetAll();
            return users.Select(user => new UserResponse(user)).ToList();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = await _userRepository.DeleteUser(id);
            if(user == null) return NotFound();
            return Ok(user);
        }



    }
}
