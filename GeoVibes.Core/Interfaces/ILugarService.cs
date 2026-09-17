using GeoVibes.API.DTOs;

namespace GeoVibes.Core.Interfaces;

public interface ILugarService
{
    Task<List<LugarResponse>?> GetLugaresPorPaisAsync(int paisId);
    Task<List<CategoriaResponse>> GetCategoriasAsync();
    Task<List<MotivoResponse>> GetMotivosAsync();
}
