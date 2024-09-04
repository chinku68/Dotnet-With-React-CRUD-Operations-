using System;

namespace My_app.DAL
{
    public class LoginResponse
{
    public string Message { get; set; }
    public int Status { get; set; }
    public string UserName { get; set; }
    public int? UserId { get; set; } // Nullable in case of failed login
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Type { get; set; }
    public int? UserStatus { get; set; } // Nullable in case of failed login
    public DateTime? CreatedOn { get; set; } // Nullable in case of failed login
}
}