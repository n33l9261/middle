const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require("mongoose");
const Task = require("./models/task");
const Pending = require("./models/pending");
const axios = require('axios');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://personakart:uazqZTdRyg77q9mt@cluster0.ivnudlo.mongodb.net/?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(
  () => {
   console.log("Connected");
  },
  () => {
      // Some task on failure
      console.log("Err in Connection");
  }
);

var mainflag = 0;

async function alertFunc1(){

 
//   setTimeout(function(){
//     console.log("Hello World");
// }, 2000);

// if (mainflag == 0){
//   await alertFunc();
// }
setInterval(async function(){
  if(mainflag == 0){
    await alertFunc();
  }
}, 2000)
}




async function alertFunc(){ 
  var a = await Pending.find();
  console.log(a);
  if(a.length != 0){
    mainflag=1;
  }


    for (var  i = 0; i<a.length;i++){
      console.log("In loop");
    



      var data = await Task.findOne({_id:a[i].taskid});
      var dataemail = data.emails;
      var emaildata2=[];
      for(var j  = 0 ; j<dataemail.length;j++){
        var emaildata = await axios.get('http://65.0.184.39:8080/?email='+dataemail[j]);
        emaildata2.push(emaildata.data);
        console.log(emaildata,"email data");
      }
      console.log(emaildata2,"emaildata2");
      var haha = await axios.get('https://app.personakart.com/emailresult?id='+a[i].taskid+'&email='+a[i].email);
      console.log(haha.data,"data");
      await Task.updateOne({_id:a[i].taskid},{data: JSON.stringify(emaildata2),statuscode:3});
      await Pending.deleteOne({taskid:a[i].taskid})
      
    }
    mainflag = 0;
  
}





app.get('/', (req, res) => {
  alertFunc1();


  res.json({
    message: 'woppah',
  });
});

// app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
