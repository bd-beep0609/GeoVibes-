using GeoVibes.Core.Models;

namespace GeoVibes.Core.Interfaces;

public interface IPaisRepository
{
    Task<IEnumerable<Pais>> GetAllAsync();
    Task<Pais?> GetByIdAsync(int id);
    Task<Pais?> GetByCodigoIsoAsync(string codigoIso);
    Task AddAsync(Pais pais);
    void Update(Pais pais);
    void Delete(Pais pais);
    Task<bool> SaveChangesAsync();
}
