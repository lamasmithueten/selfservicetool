﻿using Microsoft.Extensions.Primitives;
using Serilog;

namespace sstWebAPI.ApiKey
{
    public class ApiKeyAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public ApiKeyAuthMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!GetHeaderValue(context, out var extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("API Key missing");
                Log.Error("API Key missing");
                return;
            }

            var apiKey = _configuration.GetValue<string>(ApiKeyConstants.ApiKeySectionName);

            if(!apiKey.Equals(extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid API Key => " + apiKey);
                Log.Error("Invalid API Key");
                return;
            }
            Log.Information("API Key Accepted");
            await _next(context);
        }

        private Boolean GetHeaderValue(HttpContext context, out StringValues extractedValue)
        {
            return context.Request.Headers.TryGetValue(ApiKeyConstants.ApiKeyHeaderName, out extractedValue);
        }
    }
}
