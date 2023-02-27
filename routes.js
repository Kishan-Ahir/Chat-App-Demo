let fs = require("fs");

let requesthandler = (req,res) => {
    let url = req.url;
    let method = req.method;

    if(url === "/")
    {
        fs.readFile('chatmessages.txt',(err,data)=>{
            if(err){
                console.log(err);
            }
            res.setHeader('content-type','text/html');
        res.write('<html>');
        res.write('<head><title>My First Chat App</title></head>');
        res.write(`<body>${data}<form method="POST" action="/message"><input type="text" name="chatmessage"><button>Send</button></form></body>`);
        res.write('</html>');
        return res.end();
        })
        
    }
    if(url === "/message" && method === 'POST')
    {
        let body = [];
        req.on('data',(part_of_message)=>{
            body.push(part_of_message);
        });
        req.on('end',()=>{
            let parsedchatmsg = Buffer.concat(body).toString();
            let exactmsg = parsedchatmsg.split("=")[1];
            fs.writeFile('chatmessages.txt',exactmsg,(err)=>{
                if(err){
                    console.log(err);
                }
                res.setHeader('Location',"/");
                res.statusCode = 302;
                return res.end();
            })
        })
    }
}

module.exports = {
    handler : requesthandler,
    someetext: "Your module is succesfully imported."
};