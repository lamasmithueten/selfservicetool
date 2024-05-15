using sstWebAPI.Models;
using sstWebAPI.Models.DTO.AuthenticationUser;

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
        }

        public UserModel(RegistrationModel model)
        {
            ID = model.ID;
            role = model.role;
            email = model.email;
            username = model.username;
            password = model.password;
            firstname = model.firstname;
            lastname = model.lastname;
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

        #endregion
    }
}
