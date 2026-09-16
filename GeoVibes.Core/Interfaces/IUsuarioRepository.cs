using GeoVibes.Core.Models;

namespace GeoVibes.Core.Interfaces;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAllAsync();
    Task<Usuario?> GetByIdAsync(int id);
    Task<Usuario?> GetByEmailAsync(string email);
    Task AddAsync(Usuario usuario);
    void Update(Usuario usuario);
    void Delete(Usuario usuario);
    Task<bool> SaveChangesAsync();
}
