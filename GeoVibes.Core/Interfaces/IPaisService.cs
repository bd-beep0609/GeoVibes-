using GeoVibes.API.DTOs;

namespace GeoVibes.Core.Interfaces;

public interface IPaisService
{
    Task<List<PaisResponse>> GetPaisesAsync(string? region, string? search);
    Task<DetallePaisResponse?> GetDetallePaisAsync(int id);
}
