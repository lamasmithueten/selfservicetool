using sstWebAPI.Constants;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class CreateVacationApplicationModel
    {
        private static bool TryParseStringToDateOnly(string str, out DateOnly date)
        {
            return DateOnly.TryParseExact(str, DateFormat.DateFormatString, out date);
        }

        public static bool createVacationModel(string firstDay, string lastDay, out VacationApplicationHelperModel model)
        {
            if (TryParseStringToDateOnly(firstDay, out var firstDate) &&
            TryParseStringToDateOnly(lastDay, out var lastDate))
            {
                model = new VacationApplicationHelperModel(firstDate, lastDate);
                return true;
            }
            model = new VacationApplicationHelperModel();
            return false;
        }

        #region properties

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public string first_day { get; set; } = string.Empty;

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public string last_day { get; set; } = string.Empty;

        #endregion
    }
}