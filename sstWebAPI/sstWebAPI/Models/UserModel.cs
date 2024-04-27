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
            ID_supervisor = Guid.NewGuid(); // TODO: think about how to set ID of the supervisor
            role = UserRoles.Employee; // TODO: think about how to set roles
            email = userRegistrationModel.email;
            username = userRegistrationModel.username;
            password = userRegistrationModel.password;
            firstname = userRegistrationModel.firstname;
            lastname = userRegistrationModel.lastname;
            number_of_vacations = 30; // TODO: think about how to set number of vacation
        }

        #endregion

        #region parameters

        /// <summary>
        /// ID of user
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        /// ID_supervisor of user
        /// </summary>
        public Guid? ID_supervisor { get; set; } = Guid.Empty;

        /// <summary>
        /// role of user
        /// </summary>
        public string? role { get; set; } = null;

        /// <summary>
        /// email of user
        /// </summary>
        public string? email { get; set; } = null;

        /// <summary>
        /// username of user
        /// </summary>
        public string? username { get; set; } = null;

        /// <summary>
        /// password of user
        /// </summary>
        public string? password { get; set; } = null;

        /// <summary>
        /// firstname of user
        /// </summary>
        public string? firstname { get; set; } = null;

        /// <summary>
        /// lastname of user
        /// </summary>
        public string? lastname { get; set; } = null;

        /// <summary>
        /// number_of_vacations of user
        /// </summary>
        public int? number_of_vacations { get; set; } = null;

        #endregion
    }
}
