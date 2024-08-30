using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using My_app.BAL;
using My_app.DAL;
using Microsoft.AspNetCore.Http;



namespace My_app.Controllers{
[ApiController]
 [Route("api/[controller]")]

public class AccountController : Controller
{

 private readonly Account _account;


    public AccountController(IConfiguration configuration)
{
    _account = new Account(configuration); 
}

[Route("create")]
[HttpPost]
public string Create(IFormCollection frmcl)
{
    string name =frmcl["Name"];
    string Email =frmcl["Email"];
    string phone =frmcl["Phone"];
    string JobTitle =frmcl["JobTitle"];

    
    
 string res =_account.Create(name,Email,phone,JobTitle);
return res;
}
[Route("getAllEmployees")]
[HttpGet]
public List<Employee> GetAllEmployees()
{
    List<Employee> employeeList = _account.GetAllEmployees();
    return employeeList;
}

[Route("update")]
[HttpPut]
public string UpdateEmployee(IFormCollection frmcl)
{
    int id = Convert.ToInt32(frmcl["Id"]);
    string name = frmcl["Name"];
    string email = frmcl["Email"];
    string phone = frmcl["Phone"];
    string jobTitle = frmcl["JobTitle"];

    string res = _account.UpdateEmployee(id, name, email, phone, jobTitle);
    return res;
}

[Route("getallusers")]
[HttpGet]
public JsonResult GetAllUsers()
{
    var users = _account.GetAllUsers();
    return Json(users);
}

[Route("deleteEmployee/{id}")]
[HttpDelete]
public IActionResult DeleteEmployee(int id)
{
    string result = _account.DeleteEmployee(id);
    
    if (result.Contains("Error"))
    {
        return StatusCode(500, result); // Internal Server Error
    }

    return Ok(result);
}
[Route("updateEmployee/{id}")]
[HttpPut]
public IActionResult UpdateEmployee(int id, [FromBody] Employee employee)
{
    if (id != employee.Id)
    {
        return BadRequest("Employee ID mismatch.");
    }

    string result = _account.UpdateEmployee(employee);
    
    if (result.Contains("Error"))
    {
        return StatusCode(500, result); // Internal Server Error
    }

    return Ok(result);
}


[Route("signup")]
[HttpPost]
public string SignUp(IFormCollection frmcl)
{
    string email = frmcl["Email"];
    string name = frmcl["name"];
    string phone = frmcl["phone"];
    string password = frmcl["password"];
    
    
    string res = _account.CreateUserAccount(name, email, password, phone);

    
    return res;
}

[Route("login")]
[HttpPost]
public IActionResult Login(IFormCollection frmcl)
{

    string emailOrPhone = frmcl["emailOrPhone"];
    string password = frmcl["password"];
    var result = _account.AuthenticateUser(emailOrPhone, password);

    if (result.Code == 0)
    {
        HttpContext.Session.SetString("Email", result.Email);
        HttpContext.Session.SetString("UserName", result.UserName);
        HttpContext.Session.SetString("Phone", result.Phone);
        result.Message = "Logged in successfully";
    }
    return Json(result);
}
}
}


