using System.Collections.Immutable;

namespace sstWebAPI.Constants
{
    public class VacationApplicationStates
    {
        public const string Pending = "pending";
        public const string Accepted = "accepted";
        public const string Declined = "declined";

        public static ImmutableList<String> States = ImmutableList.Create(Pending, Accepted, Declined);
    }
}
