import 'dotenv/config';
import app from './app.js';
import dbConnect from './config/db.js';

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})

