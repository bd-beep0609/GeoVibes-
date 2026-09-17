using GeoVibes.Core.Models;

namespace GeoVibes.Core.Interfaces;

public interface IFavoritoRepository
{
    Task<bool> ExistsAsync(int usuarioId, int paisId);
    Task<Favorito?> GetAsync(int usuarioId, int paisId);
    Task<List<Favorito>> GetAllByUsuarioIdAsync(int usuarioId);
    Task AddAsync(Favorito favorito);
    void Delete(Favorito favorito);
    Task<bool> SaveChangesAsync();
}
