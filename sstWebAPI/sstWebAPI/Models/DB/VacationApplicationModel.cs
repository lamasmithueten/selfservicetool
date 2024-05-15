using sstWebAPI.Constants;
using sstWebAPI.Models.DTO.Vacation;

namespace sstWebAPI.Models.DB
{
    public class VacationApplicationModel
    {
        #region constructors

        /// <summary>
        /// base constructor | this is needed!
        /// </summary>
        public VacationApplicationModel()
        {
            ID = Guid.NewGuid();
            ID_user = Guid.NewGuid();
            first_day = DateOnly.FromDateTime(DateTime.Now);
            last_day = DateOnly.FromDateTime(DateTime.Now);
            number_of_days = 0;
            state = "";
        }

        /// <summary>
        /// constructor for creating VacationRequestModel instance with CreateVacationApplicationModel instance
        /// </summary>
        public VacationApplicationModel(CreateVacationApplicationModel model, Guid user_id, int numberOfDays)
        {
            ID = Guid.NewGuid();
            ID_user = user_id;
            first_day = model.first_day;
            last_day = model.last_day;
            number_of_days = numberOfDays;
            state = VacationApplicationStates.Pending;
        }

        #endregion

        #region properties

        /// <summary>
        /// ID of vacation request
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// ID of user who requests the vacation
        /// </summary>
        public Guid ID_user { get; set; }

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public DateOnly first_day { get; set; }

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public DateOnly last_day { get; set; }

        /// <summary>
        /// number of requested vacation days
        /// </summary>
        public int number_of_days { get; set; }

        /// <summary>
        /// current state of vacation application
        /// </summary>
        public string state { get; set; }

        /// <summary>
        /// reason for accepting/declining application
        /// </summary>
        public string? reason { get; set; }

        #endregion
    }
}
