import express from 'express'; 

const app = express();

app.get('/', function(req, res) {
 res.send('my todo app')
})

app.listen("4000", () => {
    console.log("app listening on port 4000");
});