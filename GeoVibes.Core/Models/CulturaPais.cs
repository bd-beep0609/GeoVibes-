namespace GeoVibes.Core.Models;

public class CulturaPais
{
    public int Id { get; set; }
    public int PaisId { get; set; }
    public string? Gastronomia { get; set; }
    public string? Musica { get; set; }
    public string? Patrimonio { get; set; }
    public string? DatoCurioso { get; set; }

    // Navegación
    public Pais Pais { get; set; } = null!;
}
