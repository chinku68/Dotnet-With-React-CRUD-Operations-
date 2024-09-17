using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using My_app.BAL;
using My_app.DAL;
using Microsoft.AspNetCore.Http;




namespace My_app.Controllers
{
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
            string name = frmcl["Name"];
            string Email = frmcl["Email"];
            string phone = frmcl["Phone"];
            string JobTitle = frmcl["JobTitle"];



            string res = _account.Create(name, Email, phone, JobTitle);
            return res;
        }
        [Route("getAllEmployees")]
        [HttpGet]
        public List<Employee> GetAllEmployees()
        {
            List<Employee> employeeList = _account.GetAllEmployees();
            return employeeList;
        }
        [Route("getAllProducts")]
        [HttpGet]
        public List<Product> GetAllProducts()
        {
            List<Product> productList = _account.GetAllProducts();
            return productList;
        }


        [Route("cart/{userId}")]
        [HttpGet]
        public ActionResult<List<Cart>> GetCartItems(int userId)
        {
            try
            {
                List<Cart> cartItems = _account.GetCartedItemsByUserId(userId);

                if (cartItems == null || cartItems.Count == 0)
                {
                    return NotFound("No cart items found for this user.");
                }

                return Ok(cartItems);
            }
            catch (Exception ex)
            {
                // Log the exception (use a logging framework like Serilog or NLog)
                return StatusCode(500, "Internal server error");
            }
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

        // [Route("getallusers")]
        // [HttpGet]
        // public JsonResult GetAllUsers()
        // {
        //     var users = _account.GetAllUsers();
        //     return Json(users);
        // }

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
        [Route("adduser")]
        [HttpPost]
        public string AddUser(IFormCollection frmcl)
        {
            string name = frmcl["UserName"];
            string email = frmcl["Email"];
            string phone = frmcl["Phone"];
            string type = frmcl["Type"];
            string res = _account.InsertUsers(name, email, phone, type);
            return res;
        }
        [Route("login")]
        [HttpPost]
        public IActionResult LoginUser(IFormCollection frmcl)
        {
            string email = frmcl["Email"];
            string phone = frmcl["Phone"];

            // Call the business logic layer
            var loginResponse = _account.LoginUser(email, phone);

            // Return the response as JSON
            if (loginResponse.Status == 1)
            {
                // Store user session or token as needed
                HttpContext.Session.SetString("UserId", loginResponse.UserId.ToString());
                HttpContext.Session.SetString("UserName", loginResponse.UserName);

                return Json(loginResponse); // Return the successful login response
            }
            else
            {
                return Unauthorized(new { Message = loginResponse.Message }); // Return unauthorized with error message
            }
        }

        [HttpDelete("removeCart/{cartId}")]
        public IActionResult RemoveFromCart(int cartId)
        {
            if (_account.RemoveFromCart(cartId))
            {
                return Ok(new { message = "Item removed from cart successfully." });
            }
            else
            {
                return BadRequest(new { message = "Error removing item from cart." });
            }
        }

        [Route("postproduct")]
        [HttpPost]
        public string PostProduct(IFormCollection frmcl)
        {
            if (string.IsNullOrEmpty(frmcl["UserId"]))
            {
                // Return an error message or throw an exception
                return "UserId is required";
            }
            int userId = int.Parse(frmcl["UserId"]);
            string name = frmcl["Name"];
            string manufaturedBy = frmcl["ManufaturedBy"];
            decimal unitPrice = decimal.Parse(frmcl["UnitPrice"]);
            decimal discount = decimal.Parse(frmcl["Discount"]);
            int quality = int.Parse(frmcl["Quality"]);
            string imageUrl = frmcl["ImageUrl"];

            string res = _account.PostProduct(userId, name, manufaturedBy, unitPrice, discount, quality, imageUrl);
            return res;
        }


        [HttpPost("addToCart")]
        public IActionResult AddToCart([FromBody] Cart cart)
        {
            if (_account.AddToCart(cart))
            {
                return Ok(new { message = "Item added to cart successfully." });
            }
            else
            {
                return BadRequest(new { message = "Error adding item to cart." });
            }
        }

        [HttpPost("fav")]
        public IActionResult AddToFav([FromBody] FavouriteReq fav)
        {
            int result = _account.AddToFav(fav);

            if (result == 1)
            {
                return Ok(new { message = "Item added to favorites successfully." });
            }
            else if (result == 0)
            {
                return Ok(new { message = "Item removed from favorites successfully." });
            }
            else
            {
                return BadRequest(new { message = "Error adding/removing item to/from favorites." });
            }
        }

        [Route("addfav")]
        [HttpPost]
public IActionResult ActFav(IFormCollection frmcl)
{
    try
    {
        int userId = Convert.ToInt32(frmcl["UserID"]);
        int productId = Convert.ToInt32(frmcl["ProductId"]);

        string res = _account.AddToFavo(userId, productId);

        if (res == "1")
        {
            return Ok(new { message = "Item added to favorites successfully." });
        }
        else if (res == "0")
        {
            return Ok(new { message = "Item removed from favorites successfully." });
        }
        else
        {
            return BadRequest(new { message = "Error adding/removing item to/from favorites." });
        }
    }
    catch (Exception ex)
    {
        return BadRequest(new { message = $"An error occurred: {ex.Message}" });
    }
}

[HttpGet("favourites/{userId}")]
public IActionResult GetFavourites(int userId)
{
    var favourites = _account.GetFavourites(userId);
    
    if (favourites != null && favourites.Count > 0)
    {
        return Ok(favourites);
    }
    else
    {
        return NotFound(new { message = "No favourites found for this user." });
    }
}
[Route("getfavorites")]
[HttpGet]
public IActionResult GetFavorites(int userId)
{
    try
    {
        // Assuming you have a method to get the user's favorite product IDs from the database
        List<int> favoriteProductIds = _account.GetFavoriteProductIds(userId);

        return Ok(new { favorites = favoriteProductIds });
    }
    catch (Exception ex)
    {
        return BadRequest(new { message = $"An error occurred: {ex.Message}" });
    }
}


        // [Route("login")]
        // [HttpPost]
        //     public IActionResult Login(IFormCollection frmcl)
        //     {

        //         string emailOrPhone = frmcl["emailOrPhone"];
        //         string password = frmcl["password"];
        //         var result = _account.AuthenticateUser(emailOrPhone, password);

        //         if (result.Code == 0)
        //         {
        //             HttpContext.Session.SetString("Email", result.Email);
        //             HttpContext.Session.SetString("UserName", result.UserName);
        //             HttpContext.Session.SetString("Phone", result.Phone);
        //             result.Message = "Logged in successfully";
        //         }
        //         return Json(result);
        //     }
    }
}


