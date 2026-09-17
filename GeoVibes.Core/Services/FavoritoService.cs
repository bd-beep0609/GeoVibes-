using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;

namespace GeoVibes.Core.Services;

public class FavoritoService : IFavoritoService
{
    private readonly IFavoritoRepository _favoritoRepository;
    private readonly IPaisRepository _paisRepository;
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IMapper _mapper;

    public FavoritoService(
        IFavoritoRepository favoritoRepository,
        IPaisRepository paisRepository,
        IUsuarioRepository usuarioRepository,
        IMapper mapper)
    {
        _favoritoRepository = favoritoRepository;
        _paisRepository = paisRepository;
        _usuarioRepository = usuarioRepository;
        _mapper = mapper;
    }

    public async Task<bool> AgregarFavoritoAsync(int usuarioId, int paisId)
    {
        var pais = await _paisRepository.GetByIdAsync(paisId);
        if (pais == null) return false;
        
        var usuario = await _usuarioRepository.GetByIdAsync(usuarioId);
        if (usuario == null) return false;

        var existe = await _favoritoRepository.ExistsAsync(usuarioId, paisId);
        if (existe) return false; // Ya existe

        var favorito = new Favorito
        {
            UsuarioId = usuarioId,
            PaisId = paisId,
            FechaAgregado = DateTime.Now
        };

        await _favoritoRepository.AddAsync(favorito);
        return await _favoritoRepository.SaveChangesAsync();
    }

    public async Task<bool> EliminarFavoritoAsync(int usuarioId, int paisId)
    {
        var favorito = await _favoritoRepository.GetAsync(usuarioId, paisId);
        if (favorito == null) return false;

        _favoritoRepository.Delete(favorito);
        return await _favoritoRepository.SaveChangesAsync();
    }

    public async Task<List<FavoritoResponse>> GetFavoritosAsync(int usuarioId)
    {
        var favoritos = await _favoritoRepository.GetAllByUsuarioIdAsync(usuarioId);
        return _mapper.Map<List<FavoritoResponse>>(favoritos);
    }
}
