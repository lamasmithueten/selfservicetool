namespace sstWebAPI.Helpers
{
    public class WordkdaysCalc
    {

        public static int calcNumberOfWorkdays(DateOnly startDate, DateOnly endDate)
        {
            int counter = 0;

            while (startDate.CompareTo(endDate) < 1) 
            {
                if(!(IsWeekend(startDate) || IsHoliday(startDate)))
                {
                    counter+=1;
                }
                startDate = startDate.AddDays(1);
            }

            return counter;
        }

        public static Dictionary<DateOnly, string> calcDicOfWeekendsAndHolidays(DateOnly startDate, DateOnly endDate)
        {
            var dic = new Dictionary<DateOnly, string>();

            while(startDate.CompareTo(endDate) < 1)
            {
                if (IsHoliday(startDate, out var holiday))
                {
                    dic.Add(startDate, holiday);
                } else if (IsWeekend(startDate))
                {
                    dic.Add(startDate, startDate.DayOfWeek == DayOfWeek.Saturday ? "Saturday" : "Sunday");
                }

                startDate = startDate.AddDays(1);
            }

            return dic;
        }

        private static bool IsWeekend(DateOnly date)
        {
            return date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;
        }

        private static bool IsHoliday(DateOnly date, out string holiday)
        {
            return HoldaysDic.TryGetValue(date, out holiday);
        }

        private static bool IsHoliday(DateOnly date)
        {
            return HoldaysDic.Keys.Contains(date);
        }

        private static Dictionary<DateOnly, string> HoldaysDic = new Dictionary<DateOnly, string>
            {
                { DateOnly.ParseExact("01-01-2024","dd-MM-yyyy"), "Neujahr"},
                { DateOnly.ParseExact("06-01-2024","dd-MM-yyyy"), "Erscheinungsfest "},
                { DateOnly.ParseExact("29-03-2024","dd-MM-yyyy"), "Karfreitag"},
                { DateOnly.ParseExact("01-04-2024","dd-MM-yyyy"), "Ostermontag"},
                { DateOnly.ParseExact("01-05-2024","dd-MM-yyyy"), "Tag der Arbeit"},
                { DateOnly.ParseExact("09-05-2024","dd-MM-yyyy"), "Christi Himmelfahrt"},
                { DateOnly.ParseExact("20-05-2024","dd-MM-yyyy"), "Pfingstmontag"},
                { DateOnly.ParseExact("30-05-2024","dd-MM-yyyy"), "Fronleichnam"},
                { DateOnly.ParseExact("03-10-2024","dd-MM-yyyy"), "Tag der deutschen Einheit"},
                { DateOnly.ParseExact("01-11-2024","dd-MM-yyyy"), "Allerheiligen"},
                { DateOnly.ParseExact("25-12-2024","dd-MM-yyyy"), "1. Weihnachtsfeiertag"},
                { DateOnly.ParseExact("26-12-2024","dd-MM-yyyy"), "2. Weihnachtsfeiertag"}
            };
    }
}
