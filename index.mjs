import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const app = express();
const port = 3000;

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
const db = conn.db();

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  try {
    const user = await db.collection("users").findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.age <= 21) {
      return res.status(404).json({ message: "Age is 21 or below" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
