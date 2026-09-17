using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GeoVibes.Core.DTOs;
using GeoVibes.Core.Interfaces;
using GeoVibes.Core.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GeoVibes.Core.Services;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IConfiguration _configuration;

    public UsuarioService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
    {
        _usuarioRepository = usuarioRepository;
        _configuration = configuration;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        // Buscar usuario por correo
        var usuario = await _usuarioRepository.GetByEmailAsync(request.Correo);
        if (usuario is null || !usuario.Activo)
            return null;

        // Verificar contraseña con BCrypt
        bool passwordValida = BCrypt.Net.BCrypt.Verify(request.Password, usuario.PasswordHash);
        if (!passwordValida)
            return null;

        // Generar token JWT
        string token = GenerarToken(usuario);

        return new LoginResponse
        {
            Id = usuario.Id,
            NombreCompleto = usuario.NombreCompleto,
            Correo = usuario.Correo,
            PaisOrigen = usuario.PaisOrigen,
            Rol = usuario.Rol,
            Token = token
        };
    }

    public async Task<LoginResponse?> RegistroAsync(RegistroRequest request)
    {
        // Verificar que el correo no exista
        var usuarioExistente = await _usuarioRepository.GetByEmailAsync(request.Correo);
        if (usuarioExistente is not null)
            return null; // Correo ya registrado

        // Hashear contraseña con BCrypt
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        // Crear nuevo usuario
        var nuevoUsuario = new Usuario
        {
            NombreCompleto = request.NombreCompleto,
            Correo = request.Correo,
            PaisOrigen = request.PaisOrigen,
            PasswordHash = passwordHash,
            Rol = "Usuario",
            FechaRegistro = DateTime.Now,
            Activo = true
        };

        await _usuarioRepository.AddAsync(nuevoUsuario);
        await _usuarioRepository.SaveChangesAsync();

        // Generar token JWT
        string token = GenerarToken(nuevoUsuario);

        return new LoginResponse
        {
            Id = nuevoUsuario.Id,
            NombreCompleto = nuevoUsuario.NombreCompleto,
            Correo = nuevoUsuario.Correo,
            PaisOrigen = nuevoUsuario.PaisOrigen,
            Rol = nuevoUsuario.Rol,
            Token = token
        };
    }

    public Task<bool> LogoutAsync(int usuarioId)
    {
        // En una implementación futura se puede invalidar el token usando una lista negra (Redis, BD, etc.)
        // Por ahora el cliente simplemente descarta el token del lado del frontend.
        return Task.FromResult(true);
    }

    public async Task<bool> RecuperarPasswordAsync(string correo)
    {
        var usuario = await _usuarioRepository.GetByEmailAsync(correo);
        if (usuario is null || !usuario.Activo)
            return false;

        // Generar token temporal de recuperación (GUID único)
        string tokenRecuperacion = Guid.NewGuid().ToString("N");
        usuario.TokenRecuperacion = tokenRecuperacion;

        _usuarioRepository.Update(usuario);
        await _usuarioRepository.SaveChangesAsync();

        // TODO: Integrar servicio de correo (SMTP / SendGrid) para enviar el enlace
        // Ejemplo: await _emailService.EnviarEnlaceRecuperacionAsync(correo, tokenRecuperacion);

        return true;
    }

    // ─── Método privado para generar JWT ─────────────────────────────────────
    private string GenerarToken(Usuario usuario)
    {
        var jwtKey = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("La clave JWT no está configurada en appsettings.");
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "GeoVibesAPI";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "GeoVibesApp";

        var keyBytes = Encoding.UTF8.GetBytes(jwtKey);
        var securityKey = new SymmetricSecurityKey(keyBytes);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Correo),
            new Claim(ClaimTypes.Name, usuario.NombreCompleto),
            new Claim(ClaimTypes.Role, usuario.Rol),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
