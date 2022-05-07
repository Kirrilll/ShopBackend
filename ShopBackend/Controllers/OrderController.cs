﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Domain.Entities;
using ShopBackend.Domain.Repositories;
using ShopBackend.Models;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        [HttpGet]
        public async Task<IEnumerable<OrderResponce>> GetAll()
        {
            var orders = await _orderRepository.FindAll();
            return orders.Select(order => new OrderResponce(order));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetById(int id)
        {
            var order = await _orderRepository.FindById(id);
            if(order == null) return NotFound();
            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<OrderResponce>> Create([FromBody] OrderRequest orderRequest)
        {
            if (orderRequest == null) return BadRequest();
            var order = await _orderRepository.Create(orderRequest);
            if (order == null) return NotFound();
            return Ok(new OrderResponce(order));

        }
    }
}