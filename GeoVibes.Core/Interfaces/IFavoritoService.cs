using GeoVibes.API.DTOs;

namespace GeoVibes.Core.Interfaces;

public interface IFavoritoService
{
    Task<bool> AgregarFavoritoAsync(int usuarioId, int paisId);
    Task<bool> EliminarFavoritoAsync(int usuarioId, int paisId);
    Task<List<FavoritoResponse>> GetFavoritosAsync(int usuarioId);
}
