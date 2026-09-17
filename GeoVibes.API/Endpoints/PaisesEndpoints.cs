using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeoVibes.API.Endpoints;

public static class PaisesEndpoints
{
    public static void MapPaisesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/paises")
                       .WithTags("Países")
                       .WithOpenApi();

        // GET /api/paises?region={region}&search={text} → GetPaisesAsync (200 OK)
        group.MapGet("/", async (
            [FromQuery] string? region,
            [FromQuery] string? search,
            IPaisService paisService) =>
        {
            var paises = await paisService.GetPaisesAsync(region, search);
            return Results.Ok(paises);
        })
        .WithSummary("Consultar catálogo de países")
        .WithDescription("Obtiene el catálogo completo de países de América, permitiendo filtrar por región y buscar por nombre (RF03, RF04, RF05).")
        .Produces<List<PaisResponse>>(StatusCodes.Status200OK);

        // GET /api/paises/{id} → GetDetallePaisAsync (200 OK, 404 si no existe)
        group.MapGet("/{id:int}", async (
            int id,
            IPaisService paisService) =>
        {
            var detalle = await paisService.GetDetallePaisAsync(id);
            if (detalle is null)
            {
                return Results.NotFound(new { mensaje = $"No se encontró el país con el ID {id}." });
            }

            return Results.Ok(detalle);
        })
        .WithSummary("Consultar detalle temático de un país")
        .WithDescription("Obtiene la información detallada de un país incluyendo la cultura anidada (RF06).")
        .Produces<DetallePaisResponse>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);
    }
}
