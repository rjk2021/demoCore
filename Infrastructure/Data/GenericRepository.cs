using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _contxet;

        public GenericRepository(StoreContext contxet)
        {

            _contxet = contxet;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _contxet.Set<T>().FindAsync(id);
        }



        public async Task<List<T>> GetListAsync()
        {
            return await _contxet.Set<T>().ToListAsync();
        }
        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }
        public async Task<List<T>> GetListSpecAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }
        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }
        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {

            return SpecificationEvaluator<T>.GetQueryable(_contxet.Set<T>().AsQueryable(), spec);
        }


    }
}