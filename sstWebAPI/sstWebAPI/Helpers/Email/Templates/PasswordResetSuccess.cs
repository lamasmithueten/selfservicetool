namespace sstWebAPI.Helpers.Email.Templates
{
    public class PasswordResetSuccess
    {
        public const string Subject = "Änderung Ihres Passworts";

        public const string Body = "Sehr geehrte/r Mitarbeiter/in,\r\n\r\nIhr Passwort wurde erfolgreich geändert." +
            "\r\n\r\nFalls Sie keine Änderung Ihres Passwortes beantragt haben, ändern Sie bitte umgehend Ihr Passwort und kontaktieren Sie unseren Support." +
            "\r\nSollten Sie Unterstützung benötigen oder Fragen haben, wenden Sie sich bitte ebenfalls an unseren Support." +
            "\r\n\r\nMit freundlichen Grüßen\r\n\r\nIhr IT-Support";
    }
}
