using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class MotivoLugarConfiguration : IEntityTypeConfiguration<MotivoLugar>
{
    public void Configure(EntityTypeBuilder<MotivoLugar> builder)
    {
        builder.ToTable("MotivosLugar");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Nombre)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(m => m.Descripcion)
            .HasMaxLength(300)
            .IsRequired(false);
    }
}
