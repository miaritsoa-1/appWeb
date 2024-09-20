const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDatabase();

const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
