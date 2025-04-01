using Microsoft.AspNetCore.Server.Kestrel.Core;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

//  Explicitly bind to localhost:7153 for both HTTP/2 (native) and HTTP/1.1 (gRPC-Web)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(7153, o =>
    {
        o.UseHttps();
        o.Protocols = HttpProtocols.Http1AndHttp2;
    });
});

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // 👈 Frontend origin
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();
app.UseGrpcWeb(); 

// Configure the HTTP request pipeline.
// app.MapGrpcService<GreeterService>();
app.MapGrpcService<PingPongService>().EnableGrpcWeb().RequireCors(); // Remember, middleware order matters!


app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
