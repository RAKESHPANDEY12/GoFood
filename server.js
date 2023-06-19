
global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express');
const { Connection } = require('mongoose');
const app = express()


const port=process.env.PORT || 5000

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@GoFood.ah5bv1b.mongodb.net/GoFoodData?retryWrites=true&w=majority`

Connection(URL);

if(process.env.NODE_ENV==="production"){
  app.use(express.static("front-end/build"))
 }

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/auth', require('./Routes/Auth'));


app.listen(port, () => {
  console.log(`Example app listening on ${port}`)
})

