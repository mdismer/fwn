using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mdismer.FWN.Campaigns.Migrations
{
    /// <inheritdoc />
    public partial class AddMemberships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CampaignMembership",
                schema: "campaigns",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    CampaignId = table.Column<Guid>(type: "uuid", nullable: false),
                    Permission = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampaignMembership", x => new { x.CampaignId, x.UserId });
                    table.ForeignKey(
                        name: "FK_CampaignMembership_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalSchema: "campaigns",
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampaignMembership",
                schema: "campaigns");
        }
    }
}
