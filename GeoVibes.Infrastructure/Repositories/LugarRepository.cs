using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;
using GeoVibes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeoVibes.Infrastructure.Repositories;

public class LugarRepository : ILugarRepository
{
    private readonly GeoVibesContext _context;

    public LugarRepository(GeoVibesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<LugarTuristico>> GetAllAsync()
    {
        return await _context.LugaresTuristicos
            .Include(l => l.Pais)
            .Include(l => l.Motivo)
            .Include(l => l.Categoria)
            .ToListAsync();
    }

    public async Task<LugarTuristico?> GetByIdAsync(int id)
    {
        return await _context.LugaresTuristicos
            .Include(l => l.Pais)
            .Include(l => l.Motivo)
            .Include(l => l.Categoria)
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<IEnumerable<LugarTuristico>> GetByPaisIdAsync(int paisId)
    {
        return await _context.LugaresTuristicos
            .Include(l => l.Motivo)
            .Include(l => l.Categoria)
            .Where(l => l.PaisId == paisId)
            .ToListAsync();
    }

    public async Task AddAsync(LugarTuristico lugar)
    {
        await _context.LugaresTuristicos.AddAsync(lugar);
    }

    public void Update(LugarTuristico lugar)
    {
        _context.LugaresTuristicos.Update(lugar);
    }

    public void Delete(LugarTuristico lugar)
    {
        _context.LugaresTuristicos.Remove(lugar);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
