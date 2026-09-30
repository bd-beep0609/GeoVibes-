using GeoVibes.Core.DTOs;

namespace GeoVibes.Core.Interfaces;

public interface IUsuarioService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<LoginResponse?> RegistroAsync(RegistroRequest request);
    Task<bool> LogoutAsync(int usuarioId);
    Task<bool> RecuperarPasswordAsync(string correo);
    Task<bool> ActualizarPerfilAsync(int usuarioId, ActualizarPerfilRequest request);
    Task<bool> CambiarPasswordAsync(int usuarioId, CambiarPasswordRequest request);
}
