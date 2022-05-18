using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Data.Repositories;
using ShopBackend.Dtos.ItemDtos;

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
            var item = await _shopRepository.GetById(id);
            return item == null ? NotFound() : Ok(new ShopItemResponce(item));
        }

        [HttpPost]

        public async Task<ActionResult> Create([FromForm] ShopItemRequest shopItem)
        {
            if (shopItem == null)
            {
                return BadRequest();
            }
            var createdItem = await _shopRepository.Create(shopItem)!;
            return CreatedAtAction(nameof(GetById), new { id = createdItem.ShopItemId }, createdItem);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromForm] ShopItemRequest shopItem, int id)
        {
            if(shopItem == null)
            {
                return BadRequest();
            }
            await _shopRepository.Update(shopItem, id);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            var shopItem = await _shopRepository.Delete(id);
            return shopItem != null ? Ok(new ShopItemResponce(shopItem)): NotFound();
        }
    }
}
