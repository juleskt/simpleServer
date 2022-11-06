const express = require('express')
const app = express()
const port = 3000
const request = require('request');
var path    = require("path");

let items = [];

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile('/public/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/search',function(request,response){
    //response.send("POST Request Called")
    console.log(request.body.name) //you will get your data in this as object.
    update(request.body.name, response);
})

function update(formdata, response) {
    console.log("sup" + formdata);
    request('http://api.jikan.moe/v4/anime', { json: true , rejectUnauthorized: false}, (err, res, body) => {
        if (err) { return console.log(err); }

        // console.log(body.data[0].title);
        // console.log(body.data[0].trailer.embed_url);
        // console.log(body.data[0].images.jpg.large_image_url);

        body.data.forEach((data) => {
            var anime = 
            {   
                'title': data.title,
                'url': data.trailer.embed_url,
                'image': data.images.jpg.image_url
            }

            items.push(anime)
        });

        //console.log(items)
        response.render('index', { newListItem: items});
    });
}


