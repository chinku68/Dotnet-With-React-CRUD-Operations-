using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using My_app.DAL;
//services.msc
namespace My_app.BAL
{
    public class Account
    {
        private readonly IConfiguration _configuration;
        private readonly string _connection;



        public Account(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = _configuration.GetConnectionString("DefaultString");
        }





        public string Create(string name, string email, string phone, string jobTitle)
        {
            string result = "";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("InsertEmployee", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Name", name);
                        cmd.Parameters.AddWithValue("@Email", email);
                        cmd.Parameters.AddWithValue("@Phone", phone);
                        cmd.Parameters.AddWithValue("@JobTitle", jobTitle);

                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        result = rowsAffected > 0 ? "Employee created successfully" : "Failed to create employee";
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }


        public List<Employee> GetAllEmployees()
        {
            List<Employee> employeeList = new List<Employee>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("GetAllEmployees", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                employeeList.Add(new Employee
                                {
                                    Id = Convert.ToInt32(reader["EmployeeID"]),
                                    Name = reader["Name"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    Phone = reader["Phone"].ToString(),
                                    JobTitle = reader["JobTitle"].ToString()
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }

            return employeeList;
        }
        public List<Product> GetAllProducts()
        {
            List<Product> productList = new List<Product>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("GetAllProducts", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        conn.Open();
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                productList.Add(new Product
                                {
                                    ID = Convert.ToInt32(reader["ID"]),
                                    Name = reader["Name"].ToString(),
                                    ManufacturedBy = reader["ManufaturedBy"].ToString(),
                                    UnitPrice = Convert.ToDecimal(reader["UnitPrice"]),
                                    Discount = Convert.ToDecimal(reader["Discount"]),
                                    Quality = Convert.ToInt32(reader["Quality"]),
                                    ImageUrl = reader["ImageUrl"].ToString()
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
            }

            return productList;
        }

        public string DeleteEmployee(int id)
        {
            string result = "";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("DeleteEmployee", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@EmployeeID", id);

                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        result = rowsAffected > 0 ? "Employee deleted successfully" : "Failed to delete employee";
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }

        public string UpdateEmployee(int id, string name, string email, string phone, string jobTitle)
        {
            string result = "";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("UpdateEmployee", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@EmployeeID", id);
                        cmd.Parameters.AddWithValue("@Name", name);
                        cmd.Parameters.AddWithValue("@Email", email);
                        cmd.Parameters.AddWithValue("@Phone", phone);
                        cmd.Parameters.AddWithValue("@JobTitle", jobTitle);

                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        result = rowsAffected > 0 ? "Employee updated successfully" : "Failed to update employee";
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }

        // public List<Users> GetAllUsers()
        // {
        //     List<Users> usersList = new List<Users>();

        //     try
        //     {
        //         using (SqlConnection conn = new SqlConnection(_connection))
        //         {
        //             using (SqlCommand cmd = new SqlCommand("GetAllUsers", conn))
        //             {
        //                 cmd.CommandType = CommandType.StoredProcedure;
        //                 conn.Open();

        //                 using (SqlDataReader reader = cmd.ExecuteReader())
        //                 {
        //                     while (reader.Read())
        //                     {
        //                         Users user = new Users()
        //                         {
        //                             UserName = reader["UserName"].ToString(),
        //                             Email = reader["Email"].ToString(),
        //                             Phone = reader["Phone"].ToString(),
        //                         };
        //                         usersList.Add(user);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         // Handle exception
        //     }

        //     return usersList;
        // }

        public string UpdateEmployee(Employee employee)
        {
            string result = "";

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("UpdateEmployee", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@EmployeeID", employee.Id);
                        cmd.Parameters.AddWithValue("@Name", employee.Name);
                        cmd.Parameters.AddWithValue("@JobTitle", employee.JobTitle);
                        cmd.Parameters.AddWithValue("@Phone", employee.Phone);
                        cmd.Parameters.AddWithValue("@Email", employee.Email);

                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        result = rowsAffected > 0 ? "Employee updated successfully" : "Failed to update employee";
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }

        public string CreateUserAccount(string UserName, string Email, string Password, string Phone)
        {
            string result = "";
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("InsertUserAccount", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserName", UserName);
                        cmd.Parameters.AddWithValue("@Email", Email);
                        cmd.Parameters.AddWithValue("@Password", Password);
                        cmd.Parameters.AddWithValue("@Phone", Phone);
                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            result = "Account created successfully";
                        }
                        else
                        {
                            result = "Failed to create account";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }
        public string InsertUsers(string UserName, string Email, string Phone, string Type)
        {
            string result = "";
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("InsertUser", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserName", UserName);
                        cmd.Parameters.AddWithValue("@Email", Email);

                        cmd.Parameters.AddWithValue("@PhoneNumber", Phone);
                        cmd.Parameters.AddWithValue("@Type", Type);


                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            result = "Account created successfully";
                        }
                        else
                        {
                            result = "Failed to create account";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }
        public LoginResponse LoginUser(string Email, string Phone)
        {
            var response = new LoginResponse();
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("LoginUser", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Email", Email);
                        cmd.Parameters.AddWithValue("@PhoneNumber", Phone);

                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            response.Message = reader["Message"].ToString();
                            response.Status = Convert.ToInt32(reader["Status"]);

                            if (response.Status == 1)
                            {
                                // Parse additional user details
                                response.UserName = reader["UserName"].ToString();
                                response.UserId = reader["UserId"] != DBNull.Value ? Convert.ToInt32(reader["UserId"]) : (int?)null;
                                response.Email = reader["Email"].ToString();
                                response.PhoneNumber = reader["PhoneNumber"].ToString();
                                response.Type = reader["Type"].ToString();
                                response.UserStatus = reader["UserStatus"] != DBNull.Value ? Convert.ToInt32(reader["UserStatus"]) : (int?)null;
                                response.CreatedOn = reader["CreatedOn"] != DBNull.Value ? Convert.ToDateTime(reader["CreatedOn"]) : (DateTime?)null;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error: " + ex.Message;
                response.Status = 0;
            }

            return response;
        }


        public string PostProduct(int userId, string name, string manufaturedBy, decimal unitPrice, decimal discount, int quality, string imageUrl)
        {
            string result = "";
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("PostProduct", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@Name", name);
                        cmd.Parameters.AddWithValue("@ManufaturedBy", manufaturedBy);
                        cmd.Parameters.AddWithValue("@UnitPrice", unitPrice);
                        cmd.Parameters.AddWithValue("@Discount", discount);
                        cmd.Parameters.AddWithValue("@Quality", quality);
                        cmd.Parameters.AddWithValue("@ImageUrl", imageUrl);

                        conn.Open();
                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            result = reader["Message"].ToString();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
            }

            return result;
        }

        public bool AddToCart(Cart cart)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("AddToCart", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@UserId", cart.UserId);
                        cmd.Parameters.AddWithValue("@ProductId", cart.ProductId);
                        cmd.Parameters.AddWithValue("@Name", cart.Name);
                        cmd.Parameters.AddWithValue("@ManufacturedBy", cart.ManufacturedBy);
                        cmd.Parameters.AddWithValue("@UnitPrice", cart.UnitPrice);
                        cmd.Parameters.AddWithValue("@Discount", cart.Discount);
                        cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
                        cmd.Parameters.AddWithValue("@TotalPrice", cart.TotalPrice);
                        cmd.Parameters.AddWithValue("@ImageUrl", cart.ImageUrl);

                        conn.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                // Log exception here
                return false;
            }
        }

        public List<Cart> GetCartedItemsByUserId(int userId)
        {
            List<Cart> cartItemList = new List<Cart>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    using (SqlCommand cmd = new SqlCommand("GetCartedItemsByUserId", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        conn.Open();
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                cartItemList.Add(new Cart
                                {
                                    CartID = Convert.ToInt32(reader["CartID"]),
                                    UserId = Convert.ToInt32(reader["UserId"]),
                                    ProductId = Convert.ToInt32(reader["ProductId"]),
                                    Name = reader["Name"].ToString(),
                                    ManufacturedBy = reader["ManufaturedBy"].ToString(),
                                    UnitPrice = Convert.ToDecimal(reader["UnitPrice"]),
                                    Discount = Convert.ToDecimal(reader["Discount"]),
                                    Quantity = Convert.ToInt32(reader["Quantity"]),
                                    TotalPrice = Convert.ToDecimal(reader["TotalPrice"]),
                                    ImageUrl = reader["ImageUrl"].ToString()
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
                Console.WriteLine(ex.Message);
            }

            return cartItemList;
        }

public bool RemoveFromCart(int cartId)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(_connection))
        {
            using (SqlCommand cmd = new SqlCommand("RemoveFromCart", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@CartID", cartId);

                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
        return true;
    }
    catch (Exception ex)
    {
        // Log the exception here if necessary
        return false;
    }
}

        // public Users AuthenticateUser(string emailOrPhone, string password)
        // {
        //     Users obj = new Users();

        //     try
        //     {
        //         using (SqlConnection conn = new SqlConnection(_connection))
        //         {
        //             using (SqlCommand cmd = new SqlCommand("AuthenticateUser", conn))
        //             {
        //                 cmd.CommandType = CommandType.StoredProcedure;
        //                 cmd.Parameters.AddWithValue("@EmailOrPhone", emailOrPhone);
        //                 cmd.Parameters.AddWithValue("@Password", password);

        //                 conn.Open();

        //                 using (SqlDataReader reader = cmd.ExecuteReader())
        //                 {
        //                     if (reader.HasRows)
        //                     {
        //                         while (reader.Read())
        //                         {
        //                             obj.Code = reader.GetString(reader.GetOrdinal("Message")) == "Success" ? 0 : 1;
        //                             obj.Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? string.Empty : reader.GetString(reader.GetOrdinal("Email"));
        //                             obj.UserName = reader.IsDBNull(reader.GetOrdinal("UserName")) ? string.Empty : reader.GetString(reader.GetOrdinal("UserName"));
        //                             obj.Phone = reader.IsDBNull(reader.GetOrdinal("Phone")) ? string.Empty : reader.GetString(reader.GetOrdinal("Phone"));
        //                             obj.Message = reader.GetString(reader.GetOrdinal("Message"));
        //                         }
        //                     }
        //                     else
        //                     {
        //                         obj.Code = 1; // Set custom error code for invalid credentials
        //                         obj.Message = "Invalid email/phone or password";
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         obj.Code = 1; // Set error code for exception
        //         obj.Message = "Error: " + ex.Message;
        //     }
        //     return obj;
        // }
    }
}
