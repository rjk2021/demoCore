using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);

        Task<List<T>> GetListAsync();


        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<List<T>> GetListSpecAsync(ISpecification<T> spec);


        Task<int> CountAsync(ISpecification<T> spec);
    }
}