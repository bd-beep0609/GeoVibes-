namespace GeoVibes.Core.DTOs;

public class LoginResponse
{
    public int Id { get; set; }
    public string NombreCompleto { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string? PaisOrigen { get; set; }
    public string Rol { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}
