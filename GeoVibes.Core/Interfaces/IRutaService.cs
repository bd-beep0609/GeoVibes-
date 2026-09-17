using GeoVibes.API.DTOs;

namespace GeoVibes.Core.Interfaces;

public interface IRutaService
{
    Task<bool> AgregarVisitaAsync(int usuarioId, int paisId);
    Task<List<RutaResponse>> GetRutaAsync(int usuarioId);
}
