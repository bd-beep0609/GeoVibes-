namespace GeoVibes.Core.Models;

public class Usuario
{
    public int Id { get; set; }
    public string NombreCompleto { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? PaisOrigen { get; set; }
    public string? TokenRecuperacion { get; set; }
    public DateTime FechaRegistro { get; set; } = DateTime.Now;
    public bool Activo { get; set; } = true;
    public string Rol { get; set; } = "Usuario";

    // Navegación
    public ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();
    public ICollection<RutaUsuario> RutasUsuario { get; set; } = new List<RutaUsuario>();
}
