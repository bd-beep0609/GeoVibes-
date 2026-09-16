using System.Reflection;
using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace GeoVibes.Infrastructure.Data;

public class GeoVibesContext : DbContext
{
    public GeoVibesContext(DbContextOptions<GeoVibesContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Pais> Paises => Set<Pais>();
    public DbSet<CulturaPais> CulturaPais => Set<CulturaPais>();
    public DbSet<CategoriaLugar> CategoriasLugar => Set<CategoriaLugar>();
    public DbSet<MotivoLugar> MotivosLugar => Set<MotivoLugar>();
    public DbSet<LugarTuristico> LugaresTuristicos => Set<LugarTuristico>();
    public DbSet<Favorito> Favoritos => Set<Favorito>();
    public DbSet<RutaUsuario> RutaUsuario => Set<RutaUsuario>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
