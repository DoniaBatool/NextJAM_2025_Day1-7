const orderSchema= {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customer",
        title: "Customer",
        type: "reference",
        to: [{ type: "customerInfo" }],
        description: "Reference to the customer who placed the order.",
      },
      {
        name: "products",
        title: "Products",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "productId", title: "Product ID", type: "string" },
              { name: "productName", title: "Product Name", type: "string" },
              { name: "productPrice", title: "Product Price", type: "number" },
              { name: "quantity", title: "Quantity", type: "number" },
              { name: "productImage", title: "Product Image", type: "url" },
              { name: "productDescription", title: "Product Description", type: "text" },
            ],
          },
        ],
        description: "Details of the products in the order.",
      },
      
      {
        name: "tax",
        title: "Tax",
        type: "number",
        description: "Tax amount for the order.",
      },
      {
        name: "service",
        title: "Service",
        type: "string",
        description: "Type of service selected (e.g., Purchase, Renovation,cutomize).",
        options: {
          list: [
            { title: "Purchase", value: "Purchase" },
            { title: "Renovation", value: "Renovation" },
             { title: "Customize", value: "Customize" },
          ],
        },
      },
      {
        name: "orderDate",
        title: "Order Date",
        type: "datetime",
        description: "Date and time when the order was placed.",
      },
      {
        name: "totalAmount",
        title: "Total Amount",
        type: "number",
        description: "Total amount for the order including tax and shipping.",
      },
      
          ],
        }
     export default orderSchema