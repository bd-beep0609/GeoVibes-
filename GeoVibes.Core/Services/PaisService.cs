using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;

namespace GeoVibes.Core.Services;

public class PaisService : IPaisService
{
    private readonly IPaisRepository _paisRepository;
    private readonly IMapper _mapper;

    public PaisService(IPaisRepository paisRepository, IMapper mapper)
    {
        _paisRepository = paisRepository;
        _mapper = mapper;
    }

    public async Task<List<PaisResponse>> GetPaisesAsync(string? region, string? search)
    {
        var paises = await _paisRepository.GetAllAsync();

        if (!string.IsNullOrWhiteSpace(region))
        {
            var regionFilter = region.Trim();
            paises = paises.Where(p => p.Region.Equals(regionFilter, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var searchTerm = search.Trim();
            paises = paises.Where(p =>
                p.Nombre.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                (!string.IsNullOrEmpty(p.NombreOficial) && p.NombreOficial.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)) ||
                (!string.IsNullOrEmpty(p.CodigoISO) && p.CodigoISO.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)));
        }

        return _mapper.Map<List<PaisResponse>>(paises.ToList());
    }

    public async Task<DetallePaisResponse?> GetDetallePaisAsync(int id)
    {
        var pais = await _paisRepository.GetByIdAsync(id);
        if (pais is null)
        {
            return null;
        }

        return _mapper.Map<DetallePaisResponse>(pais);
    }
}
