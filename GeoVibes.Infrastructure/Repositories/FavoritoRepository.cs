using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;
using GeoVibes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeoVibes.Infrastructure.Repositories;

public class FavoritoRepository : IFavoritoRepository
{
    private readonly GeoVibesContext _context;

    public FavoritoRepository(GeoVibesContext context)
    {
        _context = context;
    }

    public async Task<bool> ExistsAsync(int usuarioId, int paisId)
    {
        return await _context.Favoritos.AnyAsync(f => f.UsuarioId == usuarioId && f.PaisId == paisId);
    }

    public async Task<Favorito?> GetAsync(int usuarioId, int paisId)
    {
        return await _context.Favoritos.FirstOrDefaultAsync(f => f.UsuarioId == usuarioId && f.PaisId == paisId);
    }

    public async Task<List<Favorito>> GetAllByUsuarioIdAsync(int usuarioId)
    {
        return await _context.Favoritos
            .Include(f => f.Pais)
            .Where(f => f.UsuarioId == usuarioId)
            .ToListAsync();
    }

    public async Task AddAsync(Favorito favorito)
    {
        await _context.Favoritos.AddAsync(favorito);
    }

    public void Delete(Favorito favorito)
    {
        _context.Favoritos.Remove(favorito);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
