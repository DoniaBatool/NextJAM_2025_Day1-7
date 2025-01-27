import { defineQuery } from "next-sanity";



export const eightproducts = defineQuery(`
    *[_type=="product"][0..7]{
    _id,
     name,
    description,
    "slug":slug.current,
    "category": category->{name},
    price,
    tags,
    dimensions,
    quantity,
    features,
    "imageUrl":image.asset->url
}
    `)
    export const allproducts = defineQuery(`
      *[_type=="product"]{
      _id,
       name,
      description,
      "slug":slug.current,
      "category": category->{name},
      price,
      tags,
      dimensions,
      quantity,
      features,
      "imageUrl":image.asset->url
  }
      `)
//for four ceramics only
    export const ceramicsFour = defineQuery(`
        *[_type == "product" && category->name == "Ceramics"][0..3] {
  _id,
  name,
  description,
  "slug": slug.current,
  "category": category->{name},
  price,
  tags,
  dimensions,
  quantity,
  features,
  "imageUrl": image.asset->url
}

        `)
//for tags==popular products only
export const popularProducts = defineQuery(`
  *[_type == "product" &&  "popular products" in tags] {
_id,
name,
description,
"slug": slug.current,
"category": category->{name},
price,
tags,
dimensions,
quantity,
features,
"imageUrl": image.asset->url
}

  `)
 //for all ceramics
 export const ceramics = defineQuery(`
    *[_type == "product" && category->name == "Ceramics"]{
_id,
name,
description,
"slug": slug.current,
"category": category->{name},
price,
tags,
dimensions,
quantity,
features,
"imageUrl": image.asset->url
} `)  

//for all tables
export const tables = defineQuery(`
    *[_type == "product" && category->name == "Tables"]{
_id,
name,
description,
"slug": slug.current,
"category": category->{name},
price,
tags,
dimensions,
quantity,
features,
"imageUrl": image.asset->url
} `)  

//for all Chairs
export const Chairs = defineQuery(`
    *[_type == "product" && category->name == "Chairs"]{
_id,
name,
description,
"slug": slug.current,
"category": category->{name},
price,
tags,
dimensions,
quantity,
features,
"imageUrl": image.asset->url
} `)  
//for all Sofas
export const Sofas = defineQuery(`
    *[_type == "product" && category->name == "Sofas"]{
_id,
name,
description,
"slug": slug.current,
"category": category->{name},
price,
tags,
dimensions,
quantity,
features,
"imageUrl": image.asset->url
} `)  
//for all plant pots
        export const plantPots = defineQuery(`
            *[_type == "product" && category->name == "Plant pots"]{
      _id,
      name,
      description,
      "slug": slug.current,
      "category": category->{name},
      price,
      tags,
      dimensions,
      quantity,
      features,
      "imageUrl": image.asset->url
    } `)

     //for all Lamps
        export const Lamps = defineQuery(`
            *[_type == "product" && category->name == "Lamps"]{
      _id,
      name,
      description,
      "slug": slug.current,
      "category": category->{name},
      price,
      tags,
      dimensions,
      quantity,
      features,
      "imageUrl": image.asset->url
    } `)

    //for all Beds
    export const Beds = defineQuery(`
        *[_type == "product" && category->name == "Beds"]{
  _id,
  name,
  description,
  "slug": slug.current,
  "category": category->{name},
  price,
  tags,
  dimensions,
  quantity,
  features,
  "imageUrl": image.asset->url
} `)

export const sofa = defineQuery(`*[_type == "product" && slug.current == "the-poplar-suede-sofa"][0]{ 
       name,
      "imageUrl": image.asset->url,
      price,
      "category": category->{name},
      "slug": slug.current,
    }`)
    export const lastsec = defineQuery(`*[_type == "product" && slug.current == "mini-pots"][0]{ 
        
       "imageUrl": image.asset->url,
       
     }`)
     export const blacksofa = defineQuery(`*[_type == "product" && slug.current == "black-sofa"][0]{ 
        
        "imageUrl": image.asset->url,
        
      }`)
      export const yellowsofa = defineQuery(`*[_type == "product" && slug.current == "yellow-sofa"][0]{ 
        
        "imageUrl": image.asset->url,
        
      }`)

export const chairs = defineQuery(` *[_type == "product" && category->name == "Chairs"][0..1] {
     name,
      "imageUrl": image.asset->url,
      price,
       "category": category->{name},
    "slug": slug.current,
 } `)    


//faq query
// queries/faq.js
export const faqQuery = `
*[_type == "faq"] | order(_createdAt asc) {
  question,
  answer
}
`;


export const allproductsByPrice = `
  *[_type == "product" && price >= $minPrice && price <= $maxPrice] {
     _id,
      name,
      description,
      "slug": slug.current,
      "category": category->{name},
      price,
      tags,
      dimensions,
      quantity,
      features,
      "imageUrl": image.asset->url
  }
`;

export const allproductsSortedBy = `
  *[_type == "product"] | order(price $sortOrder) {
    _id,
      name,
      description,
      "slug": slug.current,
      "category": category->{name},
      price,
      tags,
      dimensions,
      quantity,
      features,
      "imageUrl": image.asset->url
  }
`;

// Example query for searching products in Sanity
export const searchProducts = `
  *[_type == "product" && name match $searchTerm] {
    _id,
    name,
    price,
    slug,
    category->{
      name
    },
    imageUrl
  }
`;


export const productsByTagQuery = (tag: string) => `
*[_type == "product" && "${tag}" in tags]{
  _id,
  name,
  description,
  "slug": slug.current,
  "category": category->{name},
  price,
  tags,
  dimensions,
  quantity,
  features,
  "imageUrl": image.asset->url
}
`;
// Sanity query function for products by category
export const productsByCategoryQuery = (category: string) => `
*[_type == "product" && category->name == "${category}"]{
  _id,
  name,
  description,
  "slug": slug.current,
  "category": category->{name},
  price,
  tags,
  dimensions,
  quantity,
  features,
  "imageUrl": image.asset->url
}
`;