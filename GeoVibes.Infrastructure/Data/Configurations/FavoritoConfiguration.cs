using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class FavoritoConfiguration : IEntityTypeConfiguration<Favorito>
{
    public void Configure(EntityTypeBuilder<Favorito> builder)
    {
        builder.ToTable("Favoritos");

        builder.HasKey(f => f.Id);

        builder.Property(f => f.FechaAgregado)
            .HasDefaultValueSql("GETDATE()");

        builder.HasIndex(f => new { f.UsuarioId, f.PaisId })
            .IsUnique();

        builder.HasOne(f => f.Usuario)
            .WithMany(u => u.Favoritos)
            .HasForeignKey(f => f.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(f => f.Pais)
            .WithMany(p => p.Favoritos)
            .HasForeignKey(f => f.PaisId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
