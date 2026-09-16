using GeoVibes.Core.Models;

namespace GeoVibes.Core.Interfaces;

public interface ILugarRepository
{
    Task<IEnumerable<LugarTuristico>> GetAllAsync();
    Task<LugarTuristico?> GetByIdAsync(int id);
    Task<IEnumerable<LugarTuristico>> GetByPaisIdAsync(int paisId);
    Task AddAsync(LugarTuristico lugar);
    void Update(LugarTuristico lugar);
    void Delete(LugarTuristico lugar);
    Task<bool> SaveChangesAsync();
}
