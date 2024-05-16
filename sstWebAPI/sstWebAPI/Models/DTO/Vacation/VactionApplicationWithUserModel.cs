using sstWebAPI.Models.DB;

namespace sstWebAPI.Models.DTO.Vacation
{
    public class VactionApplicationWithUserModel
    {
        #region constructors

        public VactionApplicationWithUserModel(Guid applicationID, Guid userID, string firstname, string lastname, DateOnly firstday, DateOnly lastday,
            int numberofdays, string State, string? Reason) 
        {
            application_ID = applicationID;
            user_id = userID;
            first_name = firstname;
            last_name = lastname;
            first_day = firstday;
            last_day = lastday;
            number_of_days = numberofdays;
            state = State;
            reason = Reason;
        }

        #endregion

        #region properties

        /// <summary>
        /// ID of applications
        /// </summary>
        public Guid application_ID { get; set; }

        /// <summary>
        /// ID of user
        /// </summary>
        public Guid user_id { get; set; }

        /// <summary>
        /// firstname of user
        /// </summary>
        public string first_name { get; set; }

        /// <summary>
        /// lastname of user
        /// </summary>
        public string last_name { get; set; }

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
