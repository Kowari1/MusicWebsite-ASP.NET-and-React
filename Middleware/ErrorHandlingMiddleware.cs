using System.Net;
using System.Text.Json;

namespace MusicWebsiteReact.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            Console.WriteLine($"Произошла ошибка: {exception.Message}");

            context.Response.ContentType = "application/json";

            var statusCode = exception switch
            {
                ArgumentException => (int)HttpStatusCode.BadRequest,
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                _ => (int)HttpStatusCode.InternalServerError
            };

            context.Response.StatusCode = statusCode;

            var result = JsonSerializer.Serialize(new
            {
                error = exception.Message,
                statusCode
            });

            return context.Response.WriteAsync(result);
        }
    }
}
