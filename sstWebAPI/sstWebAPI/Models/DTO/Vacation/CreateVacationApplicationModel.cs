using sstWebAPI.Constants;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class CreateVacationApplicationModel
    {
        public CreateVacationApplicationModel(StringVacationApplicationModel model)
        {
            first_day = DateOnly.ParseExact(model.first_day, DateFormat.DateFormatString);
            last_day = DateOnly.ParseExact(model.last_day, DateFormat.DateFormatString);
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
