using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;
using GeoVibes.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeoVibes.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly GeoVibesContext _context;

    public UsuarioRepository(GeoVibesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        return await _context.Usuarios.ToListAsync();
    }

    public async Task<Usuario?> GetByIdAsync(int id)
    {
        return await _context.Usuarios.FindAsync(id);
    }

    public async Task<Usuario?> GetByEmailAsync(string email)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Correo == email);
    }

    public async Task AddAsync(Usuario usuario)
    {
        await _context.Usuarios.AddAsync(usuario);
    }

    public void Update(Usuario usuario)
    {
        _context.Usuarios.Update(usuario);
    }

    public void Delete(Usuario usuario)
    {
        _context.Usuarios.Remove(usuario);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
