import app from './server';
import config from './config/config';
import connectDB from './utils/connectDB';
// import { fillDatabase } from './utils/fillDB';

connectDB().then(async function onServerInit() {
  console.log('Database connected');
  // await fillDatabase();

  app.listen(config.app.PORT, () => {
    console.log('Server is running on port ' + config.app.PORT);
  });
});
