namespace GeoVibes.Core.Models;

public class MotivoLugar
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }

    // Navegación
    public ICollection<LugarTuristico> LugaresTuristicos { get; set; } = new List<LugarTuristico>();
}
