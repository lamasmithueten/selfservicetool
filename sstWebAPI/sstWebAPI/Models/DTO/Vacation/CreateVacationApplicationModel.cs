using sstWebAPI.Constants;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class CreateVacationApplicationModel
    {
        public static bool TryParseStringToDateOnly(string str, out DateOnly date)
        {
            return DateOnly.TryParseExact(str, DateFormat.DateFormatString, out date);
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