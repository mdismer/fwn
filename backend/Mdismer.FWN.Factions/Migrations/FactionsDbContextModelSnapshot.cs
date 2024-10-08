﻿// <auto-generated />
using System;
using Mdismer.FWN.Factions.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Mdismer.FWN.Factions.Migrations
{
    [DbContext(typeof(FactionsDbContext))]
    partial class FactionsDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("factions")
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Mdismer.FWN.Factions.Domain.Faction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CampaignId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreationTimestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Cunning")
                        .HasColumnType("integer");

                    b.Property<int>("CurrentHitpoints")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(20000)
                        .HasColumnType("character varying(20000)");

                    b.Property<int>("Experience")
                        .HasColumnType("integer");

                    b.Property<int>("Force")
                        .HasColumnType("integer");

                    b.Property<Guid>("HomeworldId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("LastModifiedTimestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MaxHipoints")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<int>("Wealth")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Factions", "factions");
                });
#pragma warning restore 612, 618
        }
    }
}
