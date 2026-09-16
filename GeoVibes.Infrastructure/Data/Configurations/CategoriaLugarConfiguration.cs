using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class CategoriaLugarConfiguration : IEntityTypeConfiguration<CategoriaLugar>
{
    public void Configure(EntityTypeBuilder<CategoriaLugar> builder)
    {
        builder.ToTable("CategoriasLugar");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nombre)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(c => c.Icono)
            .HasMaxLength(10)
            .IsRequired(false);
    }
}
