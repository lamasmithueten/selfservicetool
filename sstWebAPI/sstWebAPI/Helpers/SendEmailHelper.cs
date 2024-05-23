using System.Net.Mail;
using System.Net;

namespace sstWebAPI.Helpers
{
    public class SendEmailHelper
    {
        public static void SendEmail(string fromEmail, string emailAppPassword, string toEmail, string subject, string text)
        {
            MailMessage mailMessage = new MailMessage(fromEmail, toEmail, subject, text);
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(fromEmail, emailAppPassword);
            smtpClient.Send(mailMessage);
        }
    }
}
