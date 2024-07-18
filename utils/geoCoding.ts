// import { Client } from "@googlemaps/google-maps-services-js";
const { Client } = require("@googlemaps/google-maps-services-js");
import { AddressRepo } from "../repo/AddressRepo";
import { StoreRepo } from "../repo/StoreRepo";
const getAddressLatLong = async (body: any, fromCreateBilling: boolean) => {
  const client = new Client();
  const address = `${body.streetAddress.replace(/[.!%]/g, "")}, ${body.city}, ${
    body.state
  }, ${body.postalCode}`;

  //   Check if address exists:

  const [billingAddress, shippingAddress] = await Promise.all([
    AddressRepo.getBillingAddress(body.streetAddress),
    AddressRepo.getShippingAddress(body.streetAddress),
    StoreRepo.checkStoreExists(body.streetAddress),
  ]);

  if (
    fromCreateBilling &&
    billingAddress &&
    Object.keys(billingAddress).length
  ) {
    const err = new Error("Address Already Exists");
    throw err;
  }

  if (
    !fromCreateBilling &&
    shippingAddress &&
    Object.keys(shippingAddress).length
  ) {
    const err = new Error("Address Already Exists");
    throw err;
  }

  const response = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    timeout: 1000,
  });

  let newBody;
  if (response.data.results.length) {
    const { formatted_address } = response.data.results[0];

    const [streetAddress, city, statePlusZip, country] =
      formatted_address.split(", ");

    const [state, postalCode] = statePlusZip.split(" ");

    const lat = response?.data?.results[0].geometry.location.lat || null;
    const long = response?.data?.results[0].geometry.location.lng || null;

    newBody = {
      userId: body.userId,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      lat,
      long,
    };
  } else {
    newBody = body;
  }

  return newBody;
};

export { getAddressLatLong };
