using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mdismer.FWN.Worlds.Migrations
{
    /// <inheritdoc />
    public partial class CreateWorlds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "worlds");

            migrationBuilder.CreateTable(
                name: "Worlds",
                schema: "worlds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CampaignId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreationTimestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModifiedTimestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Worlds", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Worlds",
                schema: "worlds");
        }
    }
}
