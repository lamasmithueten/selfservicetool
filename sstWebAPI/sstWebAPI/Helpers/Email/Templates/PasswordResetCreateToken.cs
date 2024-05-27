namespace sstWebAPI.Helpers.Email.Templates
{
    public class PasswordResetCreateToken
    {
        public const string Subject = "Passwort zurücksetzen";

        public static string Body(string token)
        {
            return "Sehr geehrte/r Mitarbeiter/in,\r\n\r\nSie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt." +
            " Bitte nutzen Sie den unten stehenden Code, um Ihr Passwort zurückzusetzen:\r\n\r\nIhr Zurücksetzungscode: " +
            $"{token}\r\n\r\nBitte beachten Sie, dass der Code nur 20 Minuten gültig ist. " +
            "Falls Sie Ihr Passwort nach Ablauf dieser Frist ändern möchten, müssen Sie einen neuen Code anfordern." +
            "\r\n\r\nFalls Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese E-Mail. " +
            "Ihr Passwort bleibt in diesem Fall unverändert.\r\n\r\n" +
            "Wenn Sie Unterstützung benötigen oder Fragen haben, wenden Sie sich bitte an unseren Support.\r\n\r\n" +
            "Freundliche Grüße,\r\n\r\nIhr IT-Support";
        }
    }
}
