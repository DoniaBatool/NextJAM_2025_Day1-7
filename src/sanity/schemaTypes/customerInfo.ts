export default {
    name: 'customerInfo',
    title: 'Customer Information',
    type: 'document',
    fields: [
      {
        name: 'fullName',
        title: 'Full Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'string',
      },
      {
        name: 'deliveryAddress',
        title: 'Delivery Address',
        type: 'string',
      },
      {
        name: 'contactNumber',
        title: 'Contact Number',
        type: 'string',
      },
      {
        name: 'service',
        type: 'string',
        title: 'Service',
        options: {
          list: ['Purchase', 'Customize', 'Renovation'],
        },
      },
    ],
  };
  