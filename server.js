import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import blogsRouter from './routes/blogsRouter';
import offreRouter from './routes/offreRouter';
import orderRouter from './routes/orderRouter';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/orders', orderRouter);

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/blogs', blogsRouter);
app.use('/api/offre', offreRouter);

// app.get("/api/products/:id", (req, res) =>{
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === productId);
//     if(product)
//     res.send(product);
//     else
//     res.status(404).send({msg :"Produit n'existe pas."})
// });
// app.get("/api/products", (req, res) =>{

//     res.send(data.products);
// });

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000');
});
