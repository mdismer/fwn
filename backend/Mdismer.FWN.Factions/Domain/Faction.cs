using Mdismer.FWN.Base.Domain;

namespace Mdismer.FWN.Factions.Domain
{
    public class Faction : Entity, IHasDeleteMarker, IHasTimestamps
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ushort Force { get; set; }

        public ushort Cunning { get; set; }

        public ushort Wealth { get; set; }

        public Guid HomeworldId { get; set; }

        public Guid CampaignId { get; set; }

        public ushort MaxHipoints { get; set; }

        public ushort CurrentHitpoints { get; set; }

        public ushort Experience { get; set; }

        public DateTime CreationTimestamp { get; set; }
        public DateTime LastModifiedTimestamp { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
