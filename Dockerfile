# Etapa 1: Compilación (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia los archivos de proyecto para restaurar dependencias (aprovecha la caché de Docker)
COPY GeoVibes.sln .
COPY GeoVibes.API/GeoVibes.API.csproj GeoVibes.API/
COPY GeoVibes.Core/GeoVibes.Core.csproj GeoVibes.Core/
COPY GeoVibes.Infrastructure/GeoVibes.Infrastructure.csproj GeoVibes.Infrastructure/
RUN dotnet restore "GeoVibes.API/GeoVibes.API.csproj"

# Copia el resto del código y publica la aplicación en modo Release
COPY . .
WORKDIR "/src/GeoVibes.API"
RUN dotnet publish "GeoVibes.API.csproj" -c Release -o /app/publish

# Etapa 2: Imagen final (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render expone el puerto 10000 por defecto, pero usaremos el 8080 que es más común.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "GeoVibes.API.dll"]