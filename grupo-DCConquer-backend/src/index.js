const dotenv = require('dotenv');
const app = require('./app');
const db = require('./models');

dotenv.config();

const PORT = process.env.PORT || 8000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.',
    );
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
