import { Pool } from "pg";

const pool: any = new Pool({
	user: "postgres",
	host: "carty-pg",
	database: "carty",
	password: "mysecretpassword",
	port: 5432
});

export { pool };
