namespace GeoVibes.Core.Models;

public class LugarTuristico
{
    public int Id { get; set; }
    public int PaisId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Ciudad { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public int? MotivoId { get; set; }
    public int? CategoriaId { get; set; }
    public decimal? Latitud { get; set; }
    public decimal? Longitud { get; set; }
    public string? ImagenUrl { get; set; }

    // Navegación
    public Pais Pais { get; set; } = null!;
    public MotivoLugar? Motivo { get; set; }
    public CategoriaLugar? Categoria { get; set; }
}
