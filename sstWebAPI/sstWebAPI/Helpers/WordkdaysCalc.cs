namespace sstWebAPI.Helpers
{
    public class WordkdaysCalc
    {

        public static int calcNumberOfWorkdays(DateOnly startDate, DateOnly endDate)
        {
            int counter = 0;

            while (startDate.CompareTo(endDate) < 1) 
            {
                if(!IsWeekend(startDate))
                {
                    counter+=1;
                }
                startDate = startDate.AddDays(1);
            }

            return counter;
        }

        private static bool IsWeekend(DateOnly date)
        {
            return date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;
        }
    }
}
