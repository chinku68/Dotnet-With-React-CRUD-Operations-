namespace My_app.DAL
{
    public class FavouriteReq
{
    public int ID { get; set; }
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Discount { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public string Name { get; set; }
    public string ManufaturedBy { get; set; }
    public string ImageUrl { get; set; }
}

}
