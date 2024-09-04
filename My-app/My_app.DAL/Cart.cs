namespace My_app.DAL
{
    public class Cart
    {
        public int CartID { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ManufacturedBy { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}

