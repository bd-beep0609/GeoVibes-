using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;
using GeoVibes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeoVibes.Infrastructure.Repositories;

public class RutaRepository : IRutaRepository
{
    private readonly GeoVibesContext _context;

    public RutaRepository(GeoVibesContext context)
    {
        _context = context;
    }

    public async Task<bool> ExistsAsync(int usuarioId, int paisId)
    {
        return await _context.RutaUsuario.AnyAsync(r => r.UsuarioId == usuarioId && r.PaisId == paisId);
    }

    public async Task<List<RutaUsuario>> GetAllByUsuarioIdAsync(int usuarioId)
    {
        return await _context.RutaUsuario
            .Include(r => r.Pais)
            .Where(r => r.UsuarioId == usuarioId)
            .ToListAsync();
    }

    public async Task AddAsync(RutaUsuario rutaUsuario)
    {
        await _context.RutaUsuario.AddAsync(rutaUsuario);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
