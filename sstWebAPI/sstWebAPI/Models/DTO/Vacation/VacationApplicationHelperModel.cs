using sstWebAPI.Constants;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class VacationApplicationHelperModel
    {

        public VacationApplicationHelperModel() { }

        public VacationApplicationHelperModel(DateOnly firstDay, DateOnly lastDay)
        {
            first_day = firstDay;
            last_day = lastDay;
        }

        #region properties

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public DateOnly first_day { get; set; }

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public DateOnly last_day { get; set; }

        #endregion
    }
}
