import mongoose from "mongoose";

const db_connection = async () => {
  await mongoose
    .connect(process.env.DATABASE_CONNECTION_URL)
    .then((res) => console.log(`db connected successfully`))
    .catch((err) => console.log(`db_connection.error`, err));
};

export default db_connection;