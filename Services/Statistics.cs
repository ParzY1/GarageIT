namespace Garage.Services
{
    public class Statistics
    {
        public int TotalQueries { get; set; }
        public int BlockedQueries { get; set; }
        public double PercentageBlocked { get; set; }
        public int DomainsOnAdlists { get; set; }
    }
}
