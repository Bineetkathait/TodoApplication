import  express  from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let workToDo=[];

app.get("/",(req,res)=>{
    var options = { weekday: 'long',  month: 'long', day: 'numeric' };
    var today  = new Date();
    res.render("index.ejs",{
        day:today.toLocaleDateString("en-US", options),
        work:workToDo,
    });
});
app.post("/submit",(req,res)=>{
    let temp= req.body["list"];
    workToDo.push(temp);
    res.redirect("/");
});

let workList=[];
app.get("/work",(req,res)=>{
    res.render("workList.ejs",{
        list:workList,
    });

})
app.post("/items",(req,res)=>{
    let temp=req.body["items"];
    workList.push(temp);
    res.redirect("/work");
})

app.listen(port,()=>{
    console.log(`Listening in port number ${port}`);
})