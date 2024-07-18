import express from "express";
const router = express.Router();

import {
	addDriverAccessToken,
	addUserAccessToken,
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	getUserByEmail
} from "../controllers/usersController";

/* GET single user listing. */
router.get("/get-user", getUser);

/* PRISMA ENDPOINTS */

/* GET Get all users */

router.get("/get-all-users", getAllUsers);

/* GET single user by email */
router.get("/get-user-by-email", getUserByEmail);

/* DEL Delete user. */
router.delete("/delete-user", deleteUser);

/* POST Create new user. */
router.post("/create-user", createUser);

/* PUT ROUTES */

/* POST Add plaid access token for driver */
router.post("/add-driver-access-token", addDriverAccessToken);

/* POST Add plaid access token for user */

router.post("/add-user-access-token", addUserAccessToken);

module.exports = router;
