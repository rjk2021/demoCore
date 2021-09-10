using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {




        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            _repo = repo;

        }
        // [HttpGet]
        // public string GetProducts()
        // {
        //     return "all products";

        // }

        //  [HttpGet("{id}")]
        // public string GetProduct(int id)
        // {
        //     return "single products";

        // }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {

            var products = await _repo.GetProductsAsync();

            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            var product = await _repo.GetProductsAsync();

            return Ok(product);
        }
        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {

            var products = await _repo.GetProductTypesAsync();

            return Ok(products);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {

            var products = await _repo.GetProductBrandsAsync();

            return Ok(products);
        }



    }
}