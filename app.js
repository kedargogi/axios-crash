const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.post('/post',(req, res,next) => {
  const data=req.body
  console.log(data);

  const name=req.body.name
  const email=req.body.email
  User.create({
    name:name,
    email:email
  })
  res.redirect('http://localhost:3000/index.html')
})
app.get('/',(req, res, next) => {
  User.findAll().then(users => {
    res.json(users)
  })

})
app.delete('/',(req, res, next) => {
  const id=req.query.id
  console.log(id);
  User.findByPk(id).then((userDetail)=>{return userDetail.destroy()})
  .then(()=>console.log(`deleted!!`))
})

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });