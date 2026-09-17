using GeoVibes.API.DTOs;
using GeoVibes.Core.Interfaces;

namespace GeoVibes.API.Endpoints;

public static class LugaresEndpoints
{
    public static void MapLugaresEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api")
                       .WithTags("Lugares")
                       .WithOpenApi();

        // GET /api/paises/{paisId}/lugares → GetLugaresPorPaisAsync (200 OK, 404 si el país no existe)
        group.MapGet("/paises/{paisId:int}/lugares", async (
            int paisId,
            ILugarService lugarService) =>
        {
            var lugares = await lugarService.GetLugaresPorPaisAsync(paisId);
            if (lugares is null)
            {
                return Results.NotFound(new { mensaje = $"No se encontró el país con el ID {paisId}." });
            }

            return Results.Ok(lugares);
        })
        .WithSummary("Consultar lugares turísticos recomendados de un país")
        .WithDescription("Obtiene los 5 lugares turísticos más recomendados para el país indicado (RF16).")
        .Produces<List<LugarResponse>>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // GET /api/lugares/categorias → GetCategoriasAsync (200 OK)
        group.MapGet("/lugares/categorias", async (
            ILugarService lugarService) =>
        {
            var categorias = await lugarService.GetCategoriasAsync();
            return Results.Ok(categorias);
        })
        .WithSummary("Consultar categorías de lugares")
        .WithDescription("Obtiene el catálogo completo de categorías para clasificar lugares turísticos.")
        .Produces<List<CategoriaResponse>>(StatusCodes.Status200OK);

        // GET /api/lugares/motivos → GetMotivosAsync (200 OK)
        group.MapGet("/lugares/motivos", async (
            ILugarService lugarService) =>
        {
            var motivos = await lugarService.GetMotivosAsync();
            return Results.Ok(motivos);
        })
        .WithSummary("Consultar motivos de viaje")
        .WithDescription("Obtiene el catálogo completo de motivos de viaje.")
        .Produces<List<MotivoResponse>>(StatusCodes.Status200OK);
    }
}
