using System.Net.Mail;
using System.Net;

namespace sstWebAPI.Helpers.Email
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

        public static void SendEmail(IConfiguration configuration, string toEmail, string subject, string body)
        {
            var fromEmail = configuration["ServiceEmailData:Email"] ?? throw new Exception("ServiceEmailData:Email is not found in the configuration.");
            var appPassword = configuration["ServiceEmailData:AppPassword"] ?? throw new Exception("ServiceEmailData:AppPassword is not found in the configuration.");
            SendEmail(fromEmail: fromEmail, emailAppPassword: appPassword, toEmail: toEmail, subject: subject, text: body);
        }
    }
}
