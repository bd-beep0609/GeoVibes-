using GeoVibes.Core.Models;

namespace GeoVibes.Core.Interfaces;

public interface IRutaRepository
{
    Task<bool> ExistsAsync(int usuarioId, int paisId);
    Task<RutaUsuario?> GetByUsuarioYPaisAsync(int usuarioId, int paisId);
    Task<List<RutaUsuario>> GetAllByUsuarioIdAsync(int usuarioId);
    Task AddAsync(RutaUsuario rutaUsuario);
    Task DeleteAsync(RutaUsuario ruta);
    Task<bool> SaveChangesAsync();
}
