import mongoose from 'mongoose';
import { app } from './app';
import config from './config/key';

async function Start() {
  const { mongoURI, port } = config;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`Connect MongoDB ${mongoURI}`);

    app.listen(port, () => {
      console.log(`Server is start on localhost:${port}`);
    });
  } catch (error) {
    console.log(`{
      Err: ${error},
      mongURI: ${mongoURI}
    }`);
  }
}

Start();
