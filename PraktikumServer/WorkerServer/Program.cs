using Solid.Core.Repositories;
using Solid.Core.Services;
using Solid.Data.Repositories;
using Solid.Data;
using Solid.Service;
using System.Text.Json.Serialization;
using Solid.Core;
using Library;
using Library.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//ginore cycle
builder.Services.AddControllers();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
//services and repo injection
builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IWorkerService, WorkerService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IManagerService, ManagerService>();
builder.Services.AddScoped<IWorkerRepository, WorkerRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IManagerRepository, ManagerRepository>();

//mapping
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(ApiMappingProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors(policyName: "AllowAll");

app.UseAuthorization();

app.UseShabbatCheck();

app.MapControllers();

app.Run();
