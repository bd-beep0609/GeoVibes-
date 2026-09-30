using GeoVibes.Core.DTOs;
using GeoVibes.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeoVibes.API.Endpoints;

public static class UsuariosEndpoints
{
    public static void MapUsuariosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/usuarios")
               .WithTags("Usuarios");
               
        // POST /api/usuarios/login — RF01: Login
        group.MapPost("/login", async (
            [FromBody] LoginRequest request,
            IUsuarioService usuarioService) =>
        {
            if (string.IsNullOrWhiteSpace(request.Correo) || string.IsNullOrWhiteSpace(request.Password))
                return Results.BadRequest(new { mensaje = "Correo y contraseña son requeridos." });

            var response = await usuarioService.LoginAsync(request);

            if (response is null)
                return Results.Unauthorized();

            return Results.Ok(response);
        })
        .WithSummary("Iniciar sesión")
        .WithDescription("Valida las credenciales del usuario y retorna un token JWT (RF01).")
        .Produces<LoginResponse>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status401Unauthorized);

        // POST /api/usuarios — RF02: Registro
        group.MapPost("/", async (
            [FromBody] RegistroRequest request,
            IUsuarioService usuarioService) =>
        {
            if (string.IsNullOrWhiteSpace(request.NombreCompleto)
                || string.IsNullOrWhiteSpace(request.Correo)
                || string.IsNullOrWhiteSpace(request.PaisOrigen)
                || string.IsNullOrWhiteSpace(request.Password))
            {
                return Results.BadRequest(new { mensaje = "Todos los campos son requeridos." });
            }

            if (request.Password.Length < 6)
                return Results.BadRequest(new { mensaje = "La contraseña debe tener al menos 6 caracteres." });

            var response = await usuarioService.RegistroAsync(request);

            if (response is null)
                return Results.Conflict(new { mensaje = "Ya existe un usuario registrado con ese correo." });

            return Results.Created($"/api/usuarios/{response.Id}", response);
        })
        .WithSummary("Registrar usuario")
        .WithDescription("Crea una cuenta nueva con los datos proporcionados (RF02).")
        .Produces<LoginResponse>(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status409Conflict);

        // POST /api/usuarios/logout — RF11: Logout
        group.MapPost("/logout", async (
            [FromBody] LogoutRequest request,
            IUsuarioService usuarioService) =>
        {
            var resultado = await usuarioService.LogoutAsync(request.UsuarioId);
            return Results.Ok(new { mensaje = "Sesión cerrada exitosamente.", exito = resultado });
        })
        .WithSummary("Cerrar sesión")
        .WithDescription("Invalida la sesión del usuario (RF11).")
        .Produces(StatusCodes.Status200OK)
        .RequireAuthorization();

        // POST /api/usuarios/recuperar-password — RF12: Recuperar contraseña
        group.MapPost("/recuperar-password", async (
            [FromBody] RecuperarPasswordRequest request,
            IUsuarioService usuarioService) =>
        {
            if (string.IsNullOrWhiteSpace(request.Correo))
                return Results.BadRequest(new { mensaje = "El correo es requerido." });

            var resultado = await usuarioService.RecuperarPasswordAsync(request.Correo);

            if (!resultado)
                return Results.NotFound(new { mensaje = "No existe una cuenta registrada con ese correo." });

            return Results.Ok(new { mensaje = "Se ha enviado un enlace de recuperación a tu correo." });
        })
        .WithSummary("Recuperar contraseña")
        .WithDescription("Genera un token temporal y envía un enlace de recuperación al correo indicado (RF12).")
        .Produces(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound);
        // PUT /api/usuarios/{id} — Actualizar perfil
        group.MapPut("/{id:int}", async (
            int id,
            [FromBody] ActualizarPerfilRequest request,
            IUsuarioService usuarioService) =>
        {
            if (string.IsNullOrWhiteSpace(request.NombreCompleto) || 
                string.IsNullOrWhiteSpace(request.Correo) || 
                string.IsNullOrWhiteSpace(request.PaisOrigen))
            {
                return Results.BadRequest(new { mensaje = "Todos los campos son requeridos." });
            }

            var resultado = await usuarioService.ActualizarPerfilAsync(id, request);
            if (!resultado)
                return Results.BadRequest(new { mensaje = "No se pudo actualizar el perfil. Verifique que el correo no esté en uso por otra cuenta." });

            return Results.Ok(new { mensaje = "Perfil actualizado exitosamente." });
        })
        .WithSummary("Actualizar perfil")
        .WithDescription("Actualiza los datos básicos del usuario.")
        .Produces(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status400BadRequest)
        .RequireAuthorization();

        // PUT /api/usuarios/{id}/password — Cambiar contraseña
        group.MapPut("/{id:int}/password", async (
            int id,
            [FromBody] CambiarPasswordRequest request,
            IUsuarioService usuarioService) =>
        {
            if (string.IsNullOrWhiteSpace(request.PasswordActual) || 
                string.IsNullOrWhiteSpace(request.PasswordNueva))
            {
                return Results.BadRequest(new { mensaje = "Ambas contraseñas son requeridas." });
            }

            if (request.PasswordNueva.Length < 6)
                return Results.BadRequest(new { mensaje = "La nueva contraseña debe tener al menos 6 caracteres." });

            var resultado = await usuarioService.CambiarPasswordAsync(id, request);
            if (!resultado)
                return Results.BadRequest(new { mensaje = "La contraseña actual es incorrecta o el usuario no existe." });

            return Results.Ok(new { mensaje = "Contraseña cambiada exitosamente." });
        })
        .WithSummary("Cambiar contraseña")
        .WithDescription("Cambia la contraseña actual de un usuario por una nueva.")
        .Produces(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status400BadRequest)
        .RequireAuthorization();
    }
}

// DTOs simples para endpoints de logout y recuperación de contraseña
public record LogoutRequest(int UsuarioId);
public record RecuperarPasswordRequest(string Correo);
