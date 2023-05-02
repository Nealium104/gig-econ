import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    // If we're already connected, no need to bother poor MongoDB again.
    return;
  }

  // Let Mongoose work its magic and connect to our database.
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log('MongoDB is now connected, and only mildly annoyed.');
}

export default dbConnect;