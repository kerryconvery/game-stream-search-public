FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY ./src ./
RUN dotnet restore
RUN dotnet build -c Release
RUN dotnet publish -c Release -o release

# # Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/release .
ENTRYPOINT ["dotnet", "GameStreamSearch.Api.dll"]