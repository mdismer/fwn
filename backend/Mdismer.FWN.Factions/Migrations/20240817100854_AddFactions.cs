using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mdismer.FWN.Factions.Migrations
{
    /// <inheritdoc />
    public partial class AddFactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "factions");

            migrationBuilder.CreateTable(
                name: "Factions",
                schema: "factions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "character varying(20000)", maxLength: 20000, nullable: false),
                    Force = table.Column<int>(type: "integer", nullable: false),
                    Cunning = table.Column<int>(type: "integer", nullable: false),
                    Wealth = table.Column<int>(type: "integer", nullable: false),
                    HomeworldId = table.Column<Guid>(type: "uuid", nullable: false),
                    CampaignId = table.Column<Guid>(type: "uuid", nullable: false),
                    MaxHipoints = table.Column<int>(type: "integer", nullable: false),
                    CurrentHitpoints = table.Column<int>(type: "integer", nullable: false),
                    Experience = table.Column<int>(type: "integer", nullable: false),
                    CreationTimestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModifiedTimestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Factions",
                schema: "factions");
        }
    }
}
