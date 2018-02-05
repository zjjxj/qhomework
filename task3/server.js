const express = require("express");
const app = express();
const request  = require("request");
const cheerio = require("cheerio");


let dataBase=[];  //[{title:"",total:"",chinese:"",english:"",punctuation:""}]

app.use(express.static(__dirname + '/public'));

app.get("/",function (req,res) {
    res.redirect("/index.html");
});

app.get("/getData",function (req,res) {
     res.json(dataBase);
});


app.get("/counter",function (req,res) {
       const url = req.query.url;
       request(url, function (error, response, body) {
           if(error){
               console.log("error");
               return
           }
           if(response.statusCode == 200){
               let str='';

               const $ = cheerio.load(body);
               function travelDom(node) {
                   if(node){
                       if(node.nodeType == 3){
                           str+=node.nodeValue.trim();
                           return;
                       }
                       let children = node.childNodes;
                       if(children){
                           for(let i=0;i<children.length;i++){
                               if(children[i].type!=='script'){
                                   travelDom(children[i]);
                               }
                           }
                       }
                   };
               };
               travelDom($('body')[0]);

               let item={"title":url,"total":str.length,"chi":0,"eng":0,"pun":0};
               for(let j=0;j<str.length;j++){
                   let code = str.charCodeAt(j);
                   if(code>255){
                       item.chi++;
                   }else if((code>=65 && code<=90) || (code>=97 && code<=122)){
                       item.eng++;
                   }else{
                       item.pun++;
                   }
               }
               dataBase.push(item);
           }

           res.json(dataBase);

       });

});

app.listen(8000,function () {
    console.log("listening at port 8000");
});