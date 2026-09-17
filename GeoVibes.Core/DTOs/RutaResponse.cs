namespace GeoVibes.API.DTOs;

public class RutaResponse
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public int PaisId { get; set; }
    public string PaisNombre { get; set; } = string.Empty;
    public string PaisBanderaUrl { get; set; } = string.Empty;
    public string PaisCapital { get; set; } = string.Empty;
    public DateTime FechaVisita { get; set; }
}
