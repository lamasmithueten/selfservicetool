namespace SelfServiceWebAPI.Models
{
    public class UserModel
    {
        public Guid ID { get; set; }
        public Guid? ID_supervisor { get; set; } = Guid.Empty;
        public string? role { get; set; } = null;
        public string? email { get; set; } = null;
        public string? username { get; set; } = null;
        public string? password { get; set; } = null;
        public string? firstname { get; set; } = null;
        public string? lastname { get; set; } = null;
        public int? number_of_vacations { get; set; } = null;
    }
}
