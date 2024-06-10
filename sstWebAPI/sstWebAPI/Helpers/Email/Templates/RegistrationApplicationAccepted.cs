namespace sstWebAPI.Helpers.Email.Templates
{
    public class RegistrationApplicationAccepted
    {
        public const string Subject = "Selfservicetool - Registrierungsantrag akzeptiert";

        public static string Body = 
            "Sehr geehrte/r Mitarbeiter/in,\r\n\r\n" +
            "Ihre Anfrage zur Erstellung eines Accounts wurde akzeptiert. Dieser ist ab jetzt freigeschaltet" +
            "\r\n\r\n" +
            "Wenn Sie Unterstützung benötigen oder Fragen haben, wenden Sie sich bitte an unseren Support.\r\n\r\n" +
            "Freundliche Grüße,\r\n\r\nIhr IT-Support";
    }
}
