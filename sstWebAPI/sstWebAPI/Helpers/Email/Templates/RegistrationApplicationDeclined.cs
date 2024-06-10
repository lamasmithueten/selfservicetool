namespace sstWebAPI.Helpers.Email.Templates
{
    public class RegistrationApplicationDeclined
    {
        public const string Subject = "Selfservicetool - Registrierungsantrag abgelehnt";

        public static string Body =
            "Sehr geehrte/r Mitarbeiter/in,\r\n\r\n" +
            "Ihre Anfrage zur Erstellung eines Accounts wurde abgelehnt." +
            "\r\n\r\n" +
            "Wenn es sich hierbei um einen Fehler handelt, melden Sie sich beim IT-Support und stellen eine neue Anfrage.\r\n\r\n" +
            "Freundliche Grüße,\r\n\r\nIhr IT-Support";
    }
}
