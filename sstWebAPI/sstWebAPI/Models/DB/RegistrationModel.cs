using sstWebAPI.Models.DTO.AuthenticationUser;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace sstWebAPI.Models
{
    public class RegistrationModel
    {
        #region constructors

        /// <summary>
        /// base constructor | this is needed!
        /// </summary>
        public RegistrationModel()
        {

        }

        /// <summary>
        /// constructor to build a  to db user
        /// </summary>
        /// <param name="userRegistrationModel"></param>
        public RegistrationModel(UserRegistrationModel userRegistrationModel)
        {
            ID = Guid.NewGuid();
            role = userRegistrationModel.Role;
            email = userRegistrationModel.Email;
            username = userRegistrationModel.Username;
            password = userRegistrationModel.Password;
            firstname = userRegistrationModel.Firstname;
            lastname = userRegistrationModel.Lastname;
            application_date = DateOnly.FromDateTime(DateTime.Now);
        }

        #endregion

        #region properties

        /// <summary>
        /// ID of entry
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
        /// creation date of application
        /// </summary>
        public DateOnly application_date { get; set; }

        #endregion
    }
}
