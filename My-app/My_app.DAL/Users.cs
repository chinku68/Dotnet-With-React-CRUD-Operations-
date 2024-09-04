using System;

namespace My_app.DAL
{
    public class Users
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Type { get; set; }
        public int Status { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}