using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {




        // private readonly IProductRepository _repo;

        // public ProductsController(IProductRepository repo)
        // {
        //     _repo = repo;

        // }

        public IGenericRepository<Product> _productsRepo { get; set; }
        public IGenericRepository<ProductType> _productTypeRepo { get; }
        public IGenericRepository<ProductBrand> _productBrandReop { get; }
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductType> productTypeRepo,
        IGenericRepository<ProductBrand> productBrandReop, IMapper mapper)
        {
            _mapper = mapper;
            _productBrandReop = productBrandReop;
            _productTypeRepo = productTypeRepo;
            _productsRepo = productsRepo;


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
        public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsTypesBrandsSpec();
            var products = await _productsRepo.GetListSpecAsync(spec);

           // var dtos = products.Select(product => _mapper.Map<Product,ProductToReturnDto>(product)).ToList();

            return Ok(_mapper.Map<List<Product>,List<ProductToReturnDto>>(products));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsTypesBrandsSpec(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);
            var productDto =_mapper.Map<Product,ProductToReturnDto>(product);// GetProductToReturnDto(product);
            //var product = await _productsRepo.GetByIdAsync(id);

            return Ok(productDto);
        }
        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes()
        {

            var types = await _productTypeRepo.GetListAsync();

            return Ok(types);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {

            var brands = await _productBrandReop.GetListAsync();

            return Ok(brands);
        }

        private ProductToReturnDto GetProductToReturnDto(Product product)
        {
            return new ProductToReturnDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                ProductType = product.ProductType.Name,
                ProductBrand = product.ProductBrand.Name

            };


        }

    }
}