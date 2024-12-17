const { MongoClient } = require('mongodb');

// MongoDB connection test
async function testMongoConnection() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('MongoDB connected successfully');
    
    // Check if the database is online and waiting for information
    const admin = client.db().admin();
    const serverStatus = await admin.serverStatus();
    console.log('MongoDB server status:', serverStatus.ok ? 'Online and waiting for information' : 'Not available');
  } catch (err) {
    console.error('MongoDB connection error', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Call the function to test the connection
testMongoConnection();