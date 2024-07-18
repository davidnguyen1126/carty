const convertUserToCamelCase = (user: any) => {
  const convertedUser: { [key: string]: any } = {};

  interface UserMap {
    [key: string]: string;
    date_of_birth: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    access_token: string;
    country_code: string;
    phone_number: string;
    billing_addresses: string;
    shipping_addresses: string;
  }

  const userMap: UserMap = {
    date_of_birth: "dateOfBirth",
    created_at: "createdAt",
    updated_at: "updatedAt",
    first_name: "firstName",
    last_name: "lastName",
    access_token: "accessToken",
    country_code: "countryCode",
    phone_number: "phoneNumber",
    billing_addresses: "billingAddresses",
    shipping_addresses: "shippingAddresses",
  };

  for (const key in user) {
    if (key in userMap) {
      const newKey = userMap[key];
      convertedUser[newKey] = user[key];
    } else {
      // Handle keys that are not in the userMap
      convertedUser[key] = user[key];
    }
  }

  return convertedUser;
};

export { convertUserToCamelCase };
