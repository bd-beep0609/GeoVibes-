using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class CulturaPaisConfiguration : IEntityTypeConfiguration<CulturaPais>
{
    public void Configure(EntityTypeBuilder<CulturaPais> builder)
    {
        builder.ToTable("CulturaPais");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Gastronomia)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(c => c.Musica)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(c => c.Patrimonio)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(c => c.DatoCurioso)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.HasOne(c => c.Pais)
            .WithOne(p => p.CulturaPais)
            .HasForeignKey<CulturaPais>(c => c.PaisId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
