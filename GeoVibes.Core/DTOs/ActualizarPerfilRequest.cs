namespace GeoVibes.Core.DTOs;

public class ActualizarPerfilRequest
{
    public string NombreCompleto { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string PaisOrigen { get; set; } = string.Empty;
}
