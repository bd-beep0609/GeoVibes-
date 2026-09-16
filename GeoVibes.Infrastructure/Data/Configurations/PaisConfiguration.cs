using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class PaisConfiguration : IEntityTypeConfiguration<Pais>
{
    public void Configure(EntityTypeBuilder<Pais> builder)
    {
        builder.ToTable("Paises");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Nombre)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(p => p.NombreOficial)
            .HasMaxLength(150)
            .IsRequired(false);

        builder.Property(p => p.CodigoISO)
            .HasColumnType("char(2)")
            .IsRequired();

        builder.Property(p => p.Region)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(p => p.Capital)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(p => p.Moneda)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(p => p.IdiomaOficial)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(p => p.AveNacional)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(p => p.BanderaUrl)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(p => p.AnimacionAveUrl)
            .HasMaxLength(500)
            .IsRequired(false);

        builder.Property(p => p.ColorPrimario)
            .HasColumnType("char(7)")
            .IsRequired();

        builder.Property(p => p.ColorSecundario)
            .HasColumnType("char(7)")
            .IsRequired();

        builder.Property(p => p.DescripcionBreve)
            .HasMaxLength(300)
            .IsRequired(false);
    }
}
