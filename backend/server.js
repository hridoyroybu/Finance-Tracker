require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

const userAuthRoutes = require('./routes/utils-server');
const userRoutes = require('./routes/userRoutes');

// Define routes
app.use('/auth', userAuthRoutes);

// Use user routes
app.use('/api/users', userRoutes);

const MONGDB_URI = process.env.MONGO_URI;

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 

// mongoose.connect(MONGDB_URI)
// .then(() => {
//     console.log("Database Connected")
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });    
// })
// .catch(e => {
//     console.log(e)
// })

const errorhandler = (err, req, res, next) => {
  res.status(500).json({ ok: false, message: err});
}

app.use(errorhandler);


// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
// });

// userSchema.methods.getUserData = function() {
//   return this.model('User').find({ name: 'Hridoy' });
// };

// // Create a User Model
// const User = mongoose.model('User', userSchema);

// Endpoint to insert a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const data = await user.getUserData();
    res.status(201).json({
      ok: true,
      users: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
