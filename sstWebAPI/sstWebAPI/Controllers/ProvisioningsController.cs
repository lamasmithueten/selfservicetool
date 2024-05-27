using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SelfServiceWebAPI;
using sstWebAPI.Constants;
using sstWebAPI.Helpers;
using sstWebAPI.Models.DB;
using sstWebAPI.Models.DTO.Provisioning;
using System.Text;
using System.Text.Json;

namespace sstWebAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProvisioningsController(AppDbContext context, IConfiguration configuration) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        /// <summary>
        /// Controller to provision virtual environments
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPut]
        [Authorize(Roles = UserRoles.Admin + "," + UserRoles.Management)]
        public async Task<IActionResult> EditProvisioningApplications(EditProvisioningApplicationModel model)
        {
            var request = _context.provisioning_request.Find(model.ApplicationId);
            if(request == null)
            {
                return NotFound("Application not found");
            }

            if (model.AcceptOrDecline)
            {
                try
                {
                    var reponse = await ProvisionServiceRequest(new ProvisioningServiceRequestModel(request.ID.ToString(), request.virtual_environment));
                    if (reponse == null || !reponse.verificationSuccessful)
                    {
                        return BadRequest("Check if you set id and type correctly");
                    }

                    var virtualEnvironment = new VirtualEnvironmentModel(request.ID, request.ID_user, request.virtual_environment,
                        model.Answer, reponse.ipAddress, reponse.userName, reponse.initialPassword);
                    _context.existing_environment.Add(virtualEnvironment);
                } catch(Exception ex)
                {
                    return BadRequest(ex);
                }
            } else
            {
                var provisionDeclined = new ProvisioningDeclinedModel(request.ID, request.ID_user, request.virtual_environment, request.purpose, model.Answer);
                _context.provisioning_declined.Add(provisionDeclined);
            }

            _context.provisioning_request.Remove(request);
            _context.SaveChanges();
            return Created();
        }

        /*
        [HttpPost]
        [Authorize]
        public IActionResult test()
        {
            if (!GetJwtDataHelper.GetUserIdFromJwt(out var user_id, HttpContext))
            {
                return Unauthorized();
            }

            var testRequest = new ProvisioningRequestModel();
            testRequest.ID = Guid.NewGuid();
            testRequest.ID_user = user_id;
            testRequest.purpose = "test";
            testRequest.virtual_environment = "windows 10";

            _context.provisioning_request.Add(testRequest);
            _context.SaveChanges();
            return Created();
        }*/

        #region helperFunctions

        private async Task<ProvisioningServiceResponseModel?> ProvisionServiceRequest(ProvisioningServiceRequestModel model)
        {
            var token = _configuration["ProvisioningService:Token"] ?? throw new Exception("ProvisioningService:Token is not found in the configuration.");
            var url = _configuration["ProvisioningService:URL"] ?? throw new Exception("ProvisioningService:URL is not found in the configuration.");
            var jsonContent = JsonSerializer.Serialize(model);

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("token", token);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(url, content);
                
                if(response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return  JsonSerializer.Deserialize<ProvisioningServiceResponseModel>(responseString);
                } else
                {
                    throw new Exception("Request failed with status code: " + response.StatusCode);
                }
            }
        }

        #endregion

    }
}
