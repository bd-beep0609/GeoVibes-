using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeoVibes.API.Endpoints;

public static class FavoritosEndpoints
{
    public static void MapFavoritosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/usuarios")
                       .WithTags("Favoritos")
                       .WithOpenApi();

        // POST /api/usuarios/{usuarioId}/favoritos → AgregarFavoritoAsync
        group.MapPost("/{usuarioId:int}/favoritos", async (
            int usuarioId,
            [FromBody] FavoritoRequest request,
            IFavoritoService favoritoService) =>
        {
            var success = await favoritoService.AgregarFavoritoAsync(usuarioId, request.PaisId);
            if (!success)
            {
                // Devolvemos Conflict (409) o BadRequest, la consigna pide 409 si ya existe.
                return Results.Conflict(new { mensaje = "No se pudo agregar el favorito. Ya existe o el país/usuario es inválido." });
            }

            return Results.Created($"/api/usuarios/{usuarioId}/favoritos", new { mensaje = "Favorito agregado exitosamente." });
        })
        .WithSummary("Marcar un país como favorito")
        .WithDescription("Agrega un país a la lista de favoritos del usuario (RF08).")
        .Produces(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status409Conflict);

        // DELETE /api/usuarios/{usuarioId}/favoritos/{paisId} → EliminarFavoritoAsync
        group.MapDelete("/{usuarioId:int}/favoritos/{paisId:int}", async (
            int usuarioId,
            int paisId,
            IFavoritoService favoritoService) =>
        {
            var success = await favoritoService.EliminarFavoritoAsync(usuarioId, paisId);
            if (!success)
            {
                return Results.NotFound(new { mensaje = "El favorito no existe." });
            }

            return Results.NoContent();
        })
        .WithSummary("Desmarcar un país como favorito")
        .WithDescription("Elimina un país de la lista de favoritos del usuario (RF09).")
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        // GET /api/usuarios/{usuarioId}/favoritos → GetFavoritosAsync
        group.MapGet("/{usuarioId:int}/favoritos", async (
            int usuarioId,
            IFavoritoService favoritoService) =>
        {
            var favoritos = await favoritoService.GetFavoritosAsync(usuarioId);
            return Results.Ok(favoritos);
        })
        .WithSummary("Consultar países favoritos")
        .WithDescription("Obtiene la lista de países marcados como favoritos por el usuario (RF10).")
        .Produces<List<FavoritoResponse>>(StatusCodes.Status200OK);
    }
}
