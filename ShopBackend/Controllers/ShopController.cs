using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Domain.Repositories;
using ShopBackend.Domain.Entities;
using ShopBackend.Models;

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
        public async Task<IEnumerable<ShopItemResponce>> GetAllItems()
        {
            var items = await _shopRepository.GetAll();
            return items.Select(item => new ShopItemResponce(item));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item =  await _shopRepository.GetById(id);
            return item == null ? NotFound() : Ok(new ShopItemResponce(item));
        }

        [HttpPost] 
        public async Task<ActionResult> Create([FromBody] ShopItemRequest shopItem)
        {
            if(shopItem == null)
            {
                return BadRequest();
            }
            var createdItem = await _shopRepository.Create(shopItem.BuildShopItem())!;
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
            return shopItem != null ? Ok(new ShopItemResponce(shopItem)): NotFound();
        }
    }
}
