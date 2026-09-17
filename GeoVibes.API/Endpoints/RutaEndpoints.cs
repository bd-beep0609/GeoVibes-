using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeoVibes.API.Endpoints;

public static class RutaEndpoints
{
    public static void MapRutaEndpoints(this IEndpointRouteBuilder app)
    {
       var group = app.MapGroup("/api/usuarios")
               .WithTags("Ruta");

        // POST /api/usuarios/{usuarioId}/ruta → AgregarVisitaAsync
        group.MapPost("/{usuarioId:int}/ruta", async (
            int usuarioId,
            [FromBody] RutaRequest request,
            IRutaService rutaService) =>
        {
            var success = await rutaService.AgregarVisitaAsync(usuarioId, request.PaisId);
            if (!success)
            {
                return Results.Conflict(new { mensaje = "No se pudo agregar a la ruta. Ya existe o el país/usuario es inválido." });
            }

            return Results.Created($"/api/usuarios/{usuarioId}/ruta", new { mensaje = "País agregado a la ruta exitosamente." });
        })
        .WithSummary("Marcar un país como visitado (Mi Ruta)")
        .WithDescription("Agrega un país a la ruta de exploración del usuario (RF15).")
        .Produces(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status409Conflict);

        // GET /api/usuarios/{usuarioId}/ruta → GetRutaAsync
        group.MapGet("/{usuarioId:int}/ruta", async (
            int usuarioId,
            IRutaService rutaService) =>
        {
            var ruta = await rutaService.GetRutaAsync(usuarioId);
            return Results.Ok(ruta);
        })
        .WithSummary("Consultar los países de Mi Ruta")
        .WithDescription("Obtiene la lista de países visitados por el usuario (RF15).")
        .Produces<List<RutaResponse>>(StatusCodes.Status200OK);
    }
}
