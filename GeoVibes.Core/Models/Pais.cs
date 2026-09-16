namespace GeoVibes.Core.Models;

public class Pais
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? NombreOficial { get; set; }
    public string CodigoISO { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string Capital { get; set; } = string.Empty;
    public string Moneda { get; set; } = string.Empty;
    public string IdiomaOficial { get; set; } = string.Empty;
    public string AveNacional { get; set; } = string.Empty;
    public string BanderaUrl { get; set; } = string.Empty;
    public string? AnimacionAveUrl { get; set; }
    public string ColorPrimario { get; set; } = string.Empty;
    public string ColorSecundario { get; set; } = string.Empty;
    public string? DescripcionBreve { get; set; }

    // Navegación
    public CulturaPais? CulturaPais { get; set; }
    public ICollection<LugarTuristico> LugaresTuristicos { get; set; } = new List<LugarTuristico>();
    public ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();
    public ICollection<RutaUsuario> RutasUsuario { get; set; } = new List<RutaUsuario>();
}
