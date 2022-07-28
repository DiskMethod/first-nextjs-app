// POST /api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(req.body);
    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup inserted",
    });
  }
};

export default handler;
