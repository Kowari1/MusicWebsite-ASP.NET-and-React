﻿using System.Linq.Expressions;

namespace MusicWebsiteReact.Data.IRepositories
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetListAsync(System.Linq.Expressions.Expression<Func<T, bool>> filter);
        Task<T> Get(Expression<Func<T, bool>> filter);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
