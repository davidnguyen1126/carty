import { Request, Response } from "express";
import { VendorServices } from "../services/VendorServices";

const addStoreToVendor = async (req: Request, res: Response) => {
  try {
    res.send(
      await VendorServices.addStoreToVendor(
        req.body.vendorId as string,
        parseInt(req.body.storeId as string)
      )
    );
  } catch (err) {
    res.send({ "Add Store to Vendor Error: ": err });
  }
};

const createVendor = async (req: Request, res: Response) => {
  try {
    res.send(await VendorServices.createVendor(req.body));
  } catch (err) {
    res.send({ "Create Vendor Error: ": err });
  }
};

const deleteVendor = async (req: Request, res: Response) => {
  try {
    res.send(await VendorServices.deleteVendor(req.query.id as string));
  } catch (err) {
    res.send({ "Delete Vendor Error: ": err });
  }
};

const getAllVendors = async (req: Request, res: Response) => {
  try {
    res.send(await VendorServices.getAllVendors());
  } catch (err) {
    res.send({ "Get All Vendors Error: ": err });
  }
};

const getVendor = async (req: Request, res: Response) => {
  try {
    res.send(await VendorServices.getVendor(req.query.id as string));
  } catch (err) {
    res.send({ "Get Vendor Error: ": err });
  }
};

export {
  addStoreToVendor,
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendor,
};
