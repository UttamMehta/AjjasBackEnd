// require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const {Server}=require("socket.io");
// const {ChartSaved}=require("./controller/chart");
const {User}=require("./database/User");
const connectDatabase = require("./config/connectDatabase");
// const ChartRouter = require("./routes/chart");
// const AuthRouter = require("./routes/auth");

const app = express();
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Hello");
});
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/hello", (req, res, next) => {
  res.send("Hello there");
  next();
});

const port = process.argv[2] || 3035;

const server=http.createServer(app);

const webshocketserver=new Server(server);

connectDatabase().then(() => {
server.listen(port, () => {
    console.log(
      `Server listening to http requests on http://localhost:${port}`
    );
  });
});

webshocketserver.on("connection",(socket)=>{

  // socket.emit("hey","hello");
  let err; let Chat;
  let userDetails={};
  socket.on("Individual",async({Id1,Id2})=>{
    if(!Id1||!Id2){
     err=true;
      webshocketserver.emit(Id1+Id2,{err});
    }
    else{
      let userDetails={};
      try {
        userDetails=await User.findOne({$or:[{Id1,Id2},{Id1:Id2,Id2:Id1}]});
        // console.log(userDetails);
        if(userDetails!==null){
           err=false;
         Chat=userDetails.ArrayChat;
          // console.log();
          webshocketserver.emit(Id1+Id2,{Chat,err});
          webshocketserver.emit(Id2+Id1,{Chat,err});
        }
        else {
          // console.log("No message yet");
        }
      } catch (error) {
        let err=true;
        console.log("line no 65");
      webshocketserver.emit(Id1+Id2,{err});
      }

    }
  })

socket.on("chat",async ({Id1,Id2,Message})=>{
// console.log(Id1+Id2+Message);
  try {
    if(!Id1||!Id2||!Message){
       err=true;
      webshocketserver.emit(Id1+Id2,{err});
    }
    else {
      userDetails=await User.findOne({$or:[{Id1,Id2},{Id1:Id2,Id2:Id1}]});
      if(userDetails!==null){
        Chat=[];
      Chat=userDetails.ArrayChat;
      Chat.push({Id1,Message})
        // userDetails.ArrayChat.push(Message);
        userDetails=await User.updateOne({_id:userDetails._id},{$set:{ArrayChat:[...Chat]}});
        console.log(userDetails);
        //  Chat=userDetails.ArrayChat;
        //  console.log(userDetails);
         err=false;
        webshocketserver.emit(Id1+Id2,({Chat,err}));
        webshocketserver.emit(Id2+Id1,({Chat,err}));
      }
      else{
        let ArrayChat=[];
        ArrayChat.push({Id1,Message});
        userDetails=await User.create({Id1,Id2,ArrayChat});
      console.log(userDetails);
         Chat=ArrayChat;
         err=false;
        webshocketserver.emit(Id1+Id2,({Chat,err}));
        webshocketserver.emit(Id2+Id1,({Chat,err}));
        console.log(Chat);
      }
    }
  } catch (error) {
     err=true;
     console.log("err on line no 106");
    webshocketserver.emit(Id1+Id2,{err});
  }
})

socket.on("disconnect",()=>{
  // console.log("disconnected");
})

})








