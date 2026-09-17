using System.ComponentModel.DataAnnotations;

namespace GeoVibes.Core.DTOs;

public class RegistroRequest
{
    [Required(ErrorMessage = "El nombre completo es requerido.")]
    public string NombreCompleto { get; set; } = string.Empty;

    [Required(ErrorMessage = "El correo es requerido.")]
    [EmailAddress(ErrorMessage = "El formato del correo no es válido.")]
    public string Correo { get; set; } = string.Empty;

    [Required(ErrorMessage = "El país de origen es requerido.")]
    public string PaisOrigen { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es requerida.")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
    public string Password { get; set; } = string.Empty;
}
