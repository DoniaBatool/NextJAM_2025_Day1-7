Hackathon \- 2025 (Brain Storming)

STEP \#1

Choice: General E-Commerce

Primary Purpose:  
The primary purpose of General E-Commerce is to provide customers with a   
centralized online platform where they can easily browse and purchase products such   
as sofas, tables, chairs, lamps, pots, and ceramics  and If a customer wants to   
renovate their old pots, lamps, tables, chairs, or other furniture, a special service   
called "Turning Oldies into Goldies" is available. Through this feature:

Customers can transform their old items into new, display-worthy pieces.  
Renovation and customization services will be provided to match the items   
with their home décor.  
\=================================================

STEP \#2

What problem does your marketplace aim to solve?

Our marketplace aims to solve the problem of finding high-quality, aesthetically   
pleasing furniture and décor items while also providing a convenient solution for   
renovating old furniture into modern, stylish pieces.

Who is your target audience?

Homeowners and office managers seeking elegant furniture and décor.  
Eco-conscious individuals interested in renovating and reusing old furniture.

What products or services will you offer?

Products: Sofas, tables, chairs, lamps, pots, and ceramics.  
Services: Custom furniture renovation through the "Turning Oldies into Goldies" feature.

What will set your marketplace apart?

Customization: Personalized renovation services tailored to customer preferences.  
Sustainability: Promoting recycling and reuse of old items.  
Convenience: Seamless shopping and renovation services on one platform.  
Aesthetics: A curated collection of stylish and high-quality products.

\=============================================================

Entities and Schema

1\. Products  
Represents the items available for purchase, customization or Furniture Makeover.

ID: Unique identifier for each product.  
Name: Name of the product (e.g., "Modern Sofa").  
Price: Cost per unit.  
Stock: Quantity available in inventory.  
Category: Classification of the product (e.g., Chair, Table, Lamp , Sofa, Pots, Ceramics,).  
Tags: Keywords for search (e.g., "Vintage", "Luxury","Antique").  
Description: Detailed description of the original product.

2\. Orders  
Tracks customer purchases and Customization/Makeover requests.

Order ID: Customer ID (schema reference of type:customer).  
Customer Email: email address of the customer .
Product Name: Name of the product (e.g., "Modern Sofa").  
Product Details: Detailed description of the original product.
product Price: Cost per unit.
Product quantity: Quantity purchased.
Total Price: Cost per unit * Quantity purchased.
Service Details: Purchase , Customization , Makeover
Status: Order status (e.g., Pending, Shipped, Delivered).  
Timestamp: Date and time of order placement.

3\. Customers  
Represents users purchasing products or requesting renovation services.

Customer ID: Unique identifier.  
Name: Full name of the customer.  
Contact Number: contact number of the customer
Customer Email: email address of the customer 
Address: Delivery address.  
Order History: List of past orders placed by the customer with date (will be tracked on the bases of the email address in the record) .

4\. Customization Requests  
Tracks customer requests for furniture or décor renovation.

Customer ID: Linked customer. 
Customer Email :email address of the customer 
Item Details: Description and photos of the item for customization.  
Estimated Cost: Approximate cost for customization will be $10 added to the original cost of the item selected by the customer  
Status: Current status of the request (e.g., In Progress, Completed).

5\. Makeover Requests  
Tracks customer requests for furniture or décor Makeover.
 
Customer ID: Linked customer. 
Customer Email: email address of the customer 
Item Details: Description and photos of the item  that belongs to  customer, for Makeover.   
Estimated Cost: Approximate cost for Makeover will be half of the cost of the original item selected by the customer from our product list.  
Status: Current status of the request (e.g., In Progress, Completed).

6\. Delivery Zones  
Defines the areas covered for delivery.

Zone Name: Name or identifier of the delivery zone.  
Coverage Area: List of postal codes or cities served.  
Assigned Drivers: Details of drivers or couriers.

7\. Shipments  
Tracks the movement of orders from the platform to customers.

Shipment ID: Unique identifier for tracking.  
Customer ID: Linked order.  
Customer Email:email address of the customer 
Status: Current status (e.g., In Transit, Delivered).  
Delivery Date: Expected or actual delivery date.  
Driver Info: Assigned driver or courier details.

\===================================================================

Entity Relationships

Products ↔ Orders

Products are linked to orders through Product ID.

Orders ↔ Customers

Orders are associated with customers using Customer ID.

Orders ↔ Shipments

Shipments track the delivery of orders using Order ID.

Delivery Zones ↔ Shipments

Shipments are assigned to delivery zones based on Zone Name.

Renovation/Customization Requests ↔ Customers

Renovation/Customization requests are linked to customers through Customer ID.

\======================================================================

Diagram Example

\[Product\]  
 \- ID  
 \- Name  
 \- Price  
 \- Stock  
 \- Category  
     |
     |  
     |  
\[Order\] \---------\> \[Customer\]  
 \- Order ID    =     \- Customer ID  
 \- Product Details   \- Name  
 \- Service Details   \- Contact Number
  \- Status           \- Customer Email  
   \- Timestamp        \- Address  
     |                 \- Order History  
     |  
     |  
\[Customization/Makeover Request\] \<------\> \[Customer\]  
 \- Customer ID  
 \- Item Details 
 \- Customer Email 
 \- Cost 
 \- Status  
     |  
     |  
\[Shipment\] \<------- \[Delivery Zone\]  
 \- Shipment ID       \- Zone Name  
 \- Customer ID        \- Coverage Area 
\- Customer Email      \- Assigned Drivers
 \- Status            

\=================================================================