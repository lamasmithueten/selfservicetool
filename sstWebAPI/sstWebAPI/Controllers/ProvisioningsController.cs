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
            if (request == null)
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
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            else
            {
                var provisionDeclined = new ProvisioningDeclinedModel(request.ID, request.ID_user, request.virtual_environment, request.purpose, model.Answer);
                _context.provisioning_declined.Add(provisionDeclined);
            }

            _context.provisioning_request.Remove(request);
            _context.SaveChanges();
            return Created();
        }

        [HttpPost]
        [Authorize]
        public ActionResult CreateProvisioningApplications(ProvisioningRequestCreationModel model)
        {

            if (!GetJwtDataHelper.GetUserIdFromJwt(out var user_id, HttpContext))
            {
                return Unauthorized();
            }

            if (!_context.virtualenvexamples.Select(x => x.name).ToList().Contains(model.VirtualEnvironment))
            {
                return BadRequest("Virtual environment not valid");
            }

            var request = new ProvisioningRequestModel(Guid.NewGuid(), user_id, model.VirtualEnvironment, model.Purpose);

            _context.provisioning_request.Add(request);
            _context.SaveChanges();
            return Created();
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetProvisioningApplicationsOfUser()
        {
            if (!GetJwtDataHelper.GetUserIdFromJwt(out var user_id, HttpContext))
            {
                return Unauthorized();
            }

            var data = GetData(user_id);
            return Ok(data);
        }

        [HttpGet("management")]
        [Authorize(Roles = UserRoles.Admin + "," + UserRoles.Management)]
        public IActionResult GetApplicationOfUserManagement(Guid user_id)
        {
            if(user_id == Guid.Empty)
            {
                var data = GetData();
                return Ok(data);
            }
            else
            {
                var user = _context.user.Find(user_id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var data = GetData(user_id);
                return Ok(data);
            }
        }

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

                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<ProvisioningServiceResponseModel>(responseString);
                }
                else
                {
                    throw new Exception("Request failed with status code: " + response.StatusCode);
                }
            }
        }

        private List<VirtualEnviromentWithUserModel> GetEnviroments(Guid? ID = null)
        {
            if(ID == null)
            {
               var data =
                from environment in _context.existing_environment
                join user in _context.user on environment.ID_user equals user.ID
                select new VirtualEnviromentWithUserModel(environment.ID, environment.ID_user, environment.virtual_environment, environment.answer, environment.IP_address, environment.username, environment.password, user.firstname, user.lastname);

                return data.ToList();
            }
            else
            {
               var data =
                    from environment in _context.existing_environment
                    join user in _context.user on environment.ID_user equals user.ID
                    where environment.ID_user == ID
                    select new VirtualEnviromentWithUserModel(environment.ID, environment.ID_user, environment.virtual_environment, environment.answer, environment.IP_address, environment.username, environment.password, user.firstname, user.lastname);

                return data.ToList();
            }
        }

        private List<ProvisioningRequestModelWithUserModel> GetRequests(Guid? ID = null)
        {
            if (ID == null)
            {
                var data =
                 from requests in _context.provisioning_request
                 join user in _context.user on requests.ID_user equals user.ID
                 select new ProvisioningRequestModelWithUserModel(requests.ID, requests.ID_user, requests.virtual_environment,requests.purpose, user.firstname, user.lastname);

                return data.ToList();
            }
            else
            {
                var data =
                     from requests in _context.provisioning_request
                     join user in _context.user on requests.ID_user equals user.ID
                     where requests.ID_user == ID
                     select new ProvisioningRequestModelWithUserModel(requests.ID, requests.ID_user, requests.virtual_environment, requests.purpose, user.firstname, user.lastname);

                return data.ToList();
            }
        }

        private List<ProvisioningDeclinedWithUserModel> GetDeclined(Guid? ID = null)
        {
            if (ID == null)
            {
                var data =
                 from requests in _context.provisioning_declined
                 join user in _context.user on requests.ID_user equals user.ID
                 select new ProvisioningDeclinedWithUserModel(requests.ID, requests.ID_user, requests.virtual_environment, requests.purpose, requests.answer, user.firstname, user.lastname);

                return data.ToList();
            }
            else
            {
                var data =
                     from requests in _context.provisioning_declined
                     join user in _context.user on requests.ID_user equals user.ID
                     where requests.ID_user == ID
                     select new ProvisioningDeclinedWithUserModel(requests.ID, requests.ID_user, requests.virtual_environment, requests.purpose, requests.answer, user.firstname, user.lastname);

                return data.ToList();
            }
        }

        private GetProvisioningDataModel GetData(Guid? ID = null)
        {
            var enviroment = GetEnviroments(ID);
            var requests = GetRequests(ID);
            var declined = GetDeclined(ID);

            return new GetProvisioningDataModel(requests, enviroment, declined);
        }

        #endregion
    }
}
