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

public List<Users> GetAllUsers()
{
    List<Users> usersList = new List<Users>();

    try
    {
        using (SqlConnection conn = new SqlConnection(_connection))
        {
            using (SqlCommand cmd = new SqlCommand("GetAllUsers", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Users user = new Users()
                        {
                            UserName = reader["UserName"].ToString(),
                            Email = reader["Email"].ToString(),
                            Phone = reader["Phone"].ToString(),
                        };
                        usersList.Add(user);
                    }
                }
            }
        }
    }
    catch (Exception ex)
    {
        // Handle exception
    }

    return usersList;
}

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
    string result="";
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
                    result  = "Failed to create account"; 
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
public Users AuthenticateUser(string emailOrPhone, string password)
{
    Users obj = new Users();

    try
    {
        using (SqlConnection conn = new SqlConnection(_connection))
        {
            using (SqlCommand cmd = new SqlCommand("AuthenticateUser", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EmailOrPhone", emailOrPhone);
                cmd.Parameters.AddWithValue("@Password", password);

                conn.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            obj.Code = reader.GetString(reader.GetOrdinal("Message")) == "Success" ? 0 : 1;
                            obj.Email = reader.IsDBNull(reader.GetOrdinal("Email")) ? string.Empty : reader.GetString(reader.GetOrdinal("Email"));
                            obj.UserName = reader.IsDBNull(reader.GetOrdinal("UserName")) ? string.Empty : reader.GetString(reader.GetOrdinal("UserName"));
                            obj.Phone = reader.IsDBNull(reader.GetOrdinal("Phone")) ? string.Empty : reader.GetString(reader.GetOrdinal("Phone"));
                            obj.Message = reader.GetString(reader.GetOrdinal("Message"));
                        }
                    }
                    else
                    {
                        obj.Code = 1; // Set custom error code for invalid credentials
                        obj.Message = "Invalid email/phone or password";
                    }
                }
            }
        }
    }
    catch (Exception ex)
    {
        obj.Code = 1; // Set error code for exception
        obj.Message = "Error: " + ex.Message;
    }
    return obj;
}
}
}
