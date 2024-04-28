using sstWebAPI.Models;

namespace SelfServiceWebAPI.Models
{
    public class UserModel
    {
        #region constructors

        /// <summary>
        /// base constructor | this is needed!
        /// </summary>
        public UserModel()
        {

        }

        /// <summary>
        /// constructor to build a registrationUser to db user
        /// </summary>
        /// <param name="userRegistrationModel"></param>
        public UserModel(UserRegistrationModel userRegistrationModel)
        {
            ID = Guid.NewGuid();
            role = userRegistrationModel.Role;
            email = userRegistrationModel.Email;
            username = userRegistrationModel.Username;
            password = userRegistrationModel.Password;
            firstname = userRegistrationModel.Firstname;
            lastname = userRegistrationModel.Lastname;
            number_of_vacations = 30; // TODO: think about how to set number of vacation
        }

        #endregion

        #region properties

        /// <summary>
        /// ID of user
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// role of user
        /// </summary>
        public string role { get; set; }

        /// <summary>
        /// email of user
        /// </summary>
        public string email { get; set; }

        /// <summary>
        /// username of user
        /// </summary>
        public string username { get; set; }

        /// <summary>
        /// password of user
        /// </summary>
        public string password { get; set; }

        /// <summary>
        /// firstname of user
        /// </summary>
        public string firstname { get; set; }

        /// <summary>
        /// lastname of user
        /// </summary>
        public string lastname { get; set; }

        /// <summary>
        /// number_of_vacations of user
        /// </summary>
        public int? number_of_vacations { get; set; } = null;

        #endregion
    }
}
