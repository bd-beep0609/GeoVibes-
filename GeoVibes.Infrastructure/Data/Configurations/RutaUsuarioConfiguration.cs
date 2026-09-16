using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class RutaUsuarioConfiguration : IEntityTypeConfiguration<RutaUsuario>
{
    public void Configure(EntityTypeBuilder<RutaUsuario> builder)
    {
        builder.ToTable("RutaUsuario");

        builder.HasKey(r => r.Id);

        builder.Property(r => r.FechaVisita)
            .HasDefaultValueSql("GETDATE()");

        builder.HasOne(r => r.Usuario)
            .WithMany(u => u.RutasUsuario)
            .HasForeignKey(r => r.UsuarioId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(r => r.Pais)
            .WithMany(p => p.RutasUsuario)
            .HasForeignKey(r => r.PaisId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
