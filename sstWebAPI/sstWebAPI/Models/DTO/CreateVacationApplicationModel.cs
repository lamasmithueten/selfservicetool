namespace sstWebAPI.Models.DTO
{
    public class CreateVacationApplicationModel
    {
        #region properties

        /// <summary>
        /// Date of the first day of vacation
        /// </summary>
        public DateTime first_day { get; set; }

        /// <summary>
        /// number of requested vacation days
        /// </summary>
        public int number_of_days { get; set; }
    
        #endregion
    }
}
