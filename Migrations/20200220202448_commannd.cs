using Microsoft.EntityFrameworkCore.Migrations;

namespace Gis.Migrations
{
    public partial class commannd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Disponible",
                table: "Produits",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Command",
                table: "Produits",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Command",
                table: "Produits");

            migrationBuilder.AlterColumn<string>(
                name: "Disponible",
                table: "Produits",
                nullable: true,
                oldClrType: typeof(bool));
        }
    }
}
