using GeoVibes.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GeoVibes.Infrastructure.Data.Configurations;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuarios");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.NombreCompleto)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(u => u.Correo)
            .HasMaxLength(150)
            .IsRequired();

        builder.HasIndex(u => u.Correo)
            .IsUnique();

        builder.Property(u => u.PasswordHash)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(u => u.PaisOrigen)
            .HasMaxLength(100)
            .IsRequired(false);

        builder.Property(u => u.TokenRecuperacion)
            .HasMaxLength(255)
            .IsRequired(false);

        builder.Property(u => u.FechaRegistro)
            .HasDefaultValueSql("GETDATE()");

        builder.Property(u => u.Activo)
            .HasDefaultValue(true);

        builder.Property(u => u.Rol)
            .HasMaxLength(20)
            .IsRequired()
            .HasDefaultValue("Usuario");
    }
}
