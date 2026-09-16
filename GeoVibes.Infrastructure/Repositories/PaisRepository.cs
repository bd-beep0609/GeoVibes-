using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;
using GeoVibes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeoVibes.Infrastructure.Repositories;

public class PaisRepository : IPaisRepository
{
    private readonly GeoVibesContext _context;

    public PaisRepository(GeoVibesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Pais>> GetAllAsync()
    {
        return await _context.Paises
            .Include(p => p.CulturaPais)
            .ToListAsync();
    }

    public async Task<Pais?> GetByIdAsync(int id)
    {
        return await _context.Paises
            .Include(p => p.CulturaPais)
            .Include(p => p.LugaresTuristicos)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Pais?> GetByCodigoIsoAsync(string codigoIso)
    {
        return await _context.Paises
            .Include(p => p.CulturaPais)
            .FirstOrDefaultAsync(p => p.CodigoISO.ToLower() == codigoIso.ToLower());
    }

    public async Task AddAsync(Pais pais)
    {
        await _context.Paises.AddAsync(pais);
    }

    public void Update(Pais pais)
    {
        _context.Paises.Update(pais);
    }

    public void Delete(Pais pais)
    {
        _context.Paises.Remove(pais);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
