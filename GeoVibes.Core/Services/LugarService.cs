using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;

namespace GeoVibes.Core.Services;

public class LugarService : ILugarService
{
    private readonly ILugarRepository _lugarRepository;
    private readonly IPaisRepository _paisRepository;
    private readonly IMapper _mapper;

    public LugarService(
        ILugarRepository lugarRepository,
        IPaisRepository paisRepository,
        IMapper mapper)
    {
        _lugarRepository = lugarRepository;
        _paisRepository = paisRepository;
        _mapper = mapper;
    }

    public async Task<List<LugarResponse>?> GetLugaresPorPaisAsync(int paisId)
    {
        var pais = await _paisRepository.GetByIdAsync(paisId);
        if (pais is null)
        {
            return null;
        }

        var lugares = await _lugarRepository.GetByPaisIdAsync(paisId);
        var top5 = lugares.Take(5).ToList();

        return _mapper.Map<List<LugarResponse>>(top5);
    }

    public async Task<List<CategoriaResponse>> GetCategoriasAsync()
    {
        var categorias = await _lugarRepository.GetCategoriasAsync();
        return _mapper.Map<List<CategoriaResponse>>(categorias.ToList());
    }

    public async Task<List<MotivoResponse>> GetMotivosAsync()
    {
        var motivos = await _lugarRepository.GetMotivosAsync();
        return _mapper.Map<List<MotivoResponse>>(motivos.ToList());
    }
}
