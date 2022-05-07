using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Domain.Repositories;
using ShopBackend.Domain.Entities;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly IShopRepository _shopRepository;

        public ShopController(IShopRepository shopRepository)
        {
            _shopRepository = shopRepository;
        }

        [HttpGet]
        public Task<IEnumerable<ShopItem>> GetAllItems()
        {
            return _shopRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item =  await _shopRepository.GetById(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost] 
        public async Task<ActionResult> Create([FromBody] ShopItem shopItem)
        {
            if(shopItem == null)
            {
                return BadRequest();
            }
            var createdItem = await _shopRepository.Create(shopItem)!;
            return CreatedAtAction(nameof(GetById), new {id = createdItem.ShopItemId}, createdItem);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] ShopItem shopItem)
        {
            if(shopItem == null)
            {
                return BadRequest();
            }
            await _shopRepository.Update(shopItem);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            var shopItem = await _shopRepository.GetById(id);
            return shopItem != null ? Ok(shopItem): NotFound();
        }
    }
}
