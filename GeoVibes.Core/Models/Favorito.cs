namespace GeoVibes.Core.Models;

public class Favorito
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public int PaisId { get; set; }
    public DateTime FechaAgregado { get; set; } = DateTime.Now;

    // Navegación
    public Usuario Usuario { get; set; } = null!;
    public Pais Pais { get; set; } = null!;
}
