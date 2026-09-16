namespace GeoVibes.Core.Models;

public class CategoriaLugar
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Icono { get; set; }

    // Navegación
    public ICollection<LugarTuristico> LugaresTuristicos { get; set; } = new List<LugarTuristico>();
}
