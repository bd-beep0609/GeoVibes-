using AutoMapper;
using GeoVibes.API.DTOs;
using GeoVibes.Core.Models;

namespace GeoVibes.API.Mappings;

public class PaisMappingProfile : Profile
{
    public PaisMappingProfile()
    {
        CreateMap<CulturaPais, CulturaResponse>();

        CreateMap<Pais, PaisResponse>();

        CreateMap<Pais, DetallePaisResponse>()
            .ForMember(dest => dest.Cultura, opt => opt.MapFrom(src => src.CulturaPais));
    }
}
