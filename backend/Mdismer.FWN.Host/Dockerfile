#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Host/Sycat.Isy.Host/Sycat.Isy.Host.csproj", "Host/Sycat.Isy.Host/"]
COPY ["Common/Sycat.Isy.Common/Sycat.Isy.Common.csproj", "Common/Sycat.Isy.Common/"]

ARG GITHUB_TOKEN
ARG GITHUB_USER

RUN dotnet restore "Host/Sycat.Isy.Host/Sycat.Isy.Host.csproj"

COPY . .
WORKDIR "/src/Host/Sycat.Isy.Host"
RUN dotnet build "Sycat.Isy.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Sycat.Isy.Host.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sycat.Isy.Host.dll"]