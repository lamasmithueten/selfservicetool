using System.Security.Cryptography;
using System.Text;

namespace sstWebAPI.Helpers
{
    public static class CalcHash
    {
        public static string GetHashString(string inputString, string salt)
        {
            StringBuilder sb = new();
            foreach (byte b in GetHash(inputString + salt))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }

        public static string GenerateSalt()
        {
            using var rng = RandomNumberGenerator.Create();
            var randomNumber = new byte[10];
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private static byte[] GetHash(string inputString)
        {
            return SHA256.HashData(Encoding.UTF8.GetBytes(inputString));
        }
    }
}
