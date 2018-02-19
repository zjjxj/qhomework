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
     // res.json(dataBase);
    let  resData=[];
    const url ='/counter/getData';
    request(url, function (error, response, body) {
        if (response) {
            resData=body;
            res.json(resData);

        } else {
            console.log(err);
        }
    })
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
                   }
               }

               travelDom($('body')[0]);

               let item={"title":url,"number":str.length,"chNumber":0,"enNumber":0,"puncNumber":0};
               for(let j=0;j<str.length;j++){
                   let code = str.charCodeAt(j);
                   if(code>255){
                       item.chNumber++;
                   }else if((code>=65 && code<=90) || (code>=97 && code<=122)){
                       item.enNumber++;
                   }else{
                       item.puncNumber++;
                   }
               }

               //存入数据库
               request({
                   url: '/counter/save' ,
                   method: "POST",
                   json: true,
                   headers: {
                       "content-type": "application/json",
                   },
                   body: JSON.stringify(item)
               }, function(error, response, body) {
                   if (!error && response.statusCode == 200) {
                       console.log(body) // 请求成功的处理逻辑

                   }
               });
               //mockData
               dataBase.push(item);
           }

           res.redirect("/getData");

       });

});

app.listen(8000,function () {
    console.log("listening at port 8000");
});