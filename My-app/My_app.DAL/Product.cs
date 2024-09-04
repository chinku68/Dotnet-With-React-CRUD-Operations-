using System;

namespace My_app.DAL
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string ManufacturedBy { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quality { get; set; }
        public string ImageUrl { get; set; }
    }
}
