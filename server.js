// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// // mongodb://localhost:27017/invoiceDB

// app.get('/' ,(req,res)=>{
//   res.send("product is running")
// })


// // MongoDB connection
// mongoose.connect('mongodb+srv://jaysanker918:Saijay123@cluster1.edpb80l.mongodb.net/invoiceDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/invoice', invoiceRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("product is running")
})

// MongoDB connection
const dbURI = process.env.DB_HOST;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoice', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
