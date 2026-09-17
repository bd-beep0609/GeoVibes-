namespace GeoVibes.API.DTOs;

public class LugarResponse
{
    public int Id { get; set; }
    public int PaisId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Ciudad { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public int? MotivoId { get; set; }
    public string? MotivoNombre { get; set; }
    public int? CategoriaId { get; set; }
    public string? CategoriaNombre { get; set; }
    public string? CategoriaIcono { get; set; }
    public decimal? Latitud { get; set; }
    public decimal? Longitud { get; set; }
    public string? ImagenUrl { get; set; }
}

public class CategoriaResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Icono { get; set; }
}

public class MotivoResponse
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
}
