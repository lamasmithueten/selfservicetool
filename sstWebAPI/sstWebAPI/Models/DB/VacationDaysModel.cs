using sstWebAPI.Models;
using sstWebAPI.Models.DTO;

namespace SelfServiceWebAPI.Models
{
    public class VacationDaysModel
    {
        #region constructors

        /// <summary>
        /// base constructor | this is needed!
        /// </summary>
        public VacationDaysModel()
        {
        }

        /// <summary>
        /// constructor for filling object with data
        /// </summary>
        public VacationDaysModel(Guid userId, int totalDays = 30, int usedDays = 0, int plannedDays = 0)
        {
            ID = Guid.NewGuid();
            ID_user = userId;
            total_days = totalDays;
            used_days = usedDays;
            planned_days = plannedDays;
        }

        #endregion

        #region properties

        /// <summary>
        /// ID of entry
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// ID of user
        /// </summary>
        public Guid ID_user { get; set; }

        /// <summary>
        /// total vacation days of user
        /// </summary>
        public int total_days { get; set; }

        /// <summary>
        /// used vacation days of user
        /// </summary>
        public int used_days { get; set; }

        /// <summary>
        /// planned vacation days of user
        /// </summary>
        public int planned_days { get; set; }

        #endregion
    }
}

