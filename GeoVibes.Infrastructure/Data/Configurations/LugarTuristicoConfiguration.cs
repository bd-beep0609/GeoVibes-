using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class LugarTuristicoConfiguration : IEntityTypeConfiguration<LugarTuristico>
{
    public void Configure(EntityTypeBuilder<LugarTuristico> builder)
    {
        builder.ToTable("LugaresTuristicos");

        builder.HasKey(l => l.Id);

        builder.Property(l => l.Nombre)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(l => l.Ciudad)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(l => l.Descripcion)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(l => l.Latitud)
            .HasPrecision(10, 8)
            .IsRequired(false);

        builder.Property(l => l.Longitud)
            .HasPrecision(11, 8)
            .IsRequired(false);

        builder.Property(l => l.ImagenUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.HasOne(l => l.Pais)
            .WithMany(p => p.LugaresTuristicos)
            .HasForeignKey(l => l.PaisId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(l => l.Motivo)
            .WithMany(m => m.LugaresTuristicos)
            .HasForeignKey(l => l.MotivoId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(l => l.Categoria)
            .WithMany(c => c.LugaresTuristicos)
            .HasForeignKey(l => l.CategoriaId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
