using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;

namespace GeoVibes.Core.Services;

public class RutaService : IRutaService
{
    private readonly IRutaRepository _rutaRepository;
    private readonly IPaisRepository _paisRepository;
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IMapper _mapper;

    public RutaService(
        IRutaRepository rutaRepository,
        IPaisRepository paisRepository,
        IUsuarioRepository usuarioRepository,
        IMapper mapper)
    {
        _rutaRepository = rutaRepository;
        _paisRepository = paisRepository;
        _usuarioRepository = usuarioRepository;
        _mapper = mapper;
    }

    public async Task<bool> AgregarVisitaAsync(int usuarioId, int paisId)
    {
        var pais = await _paisRepository.GetByIdAsync(paisId);
        if (pais == null) return false;
        
        var usuario = await _usuarioRepository.GetByIdAsync(usuarioId);
        if (usuario == null) return false;

        var existe = await _rutaRepository.ExistsAsync(usuarioId, paisId);
        if (existe) return false; // Ya existe

        var ruta = new RutaUsuario
        {
            UsuarioId = usuarioId,
            PaisId = paisId,
            FechaVisita = DateTime.Now
        };

        await _rutaRepository.AddAsync(ruta);
        return await _rutaRepository.SaveChangesAsync();
    }

    public async Task<List<RutaResponse>> GetRutaAsync(int usuarioId)
    {
        var rutas = await _rutaRepository.GetAllByUsuarioIdAsync(usuarioId);
        return _mapper.Map<List<RutaResponse>>(rutas);
    }
}
