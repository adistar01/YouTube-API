const express = require('express');
const request = require('request');
const Video = require('./models/videos');
require('./db/mongoose');

// key = AIzaSyAhAUw5y1-wmSJj5Vy4X5W5GGLkgEbrcoE

const app = express();

app.use(express.json());


app.get('/videos', async(req, res)=>{

    const url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAhAUw5y1-wmSJj5Vy4X5W5GGLkgEbrcoE&type=video&q=cricket&part=snippet&publishedAfter2022-01-01T00:00:00Z";

    request({ url, json: true }, (error, response) => {
        if (error) {
            return console.log("Unable to connect to api service");
        } else {
            console.log(response.body);
            console.log("\n");
            console.log("\n");
            let flag = 1;
            console.log(response.body.items[0]);
            response.body.items.forEach((item) => {
                var obj = {};
                obj.title = item.snippet.title;
                obj.description = item.snippet.description;
                obj.datetime = item.snippet.publishTime;
                obj.defaulturl1 = item.snippet.thumbnails.default.url;
                obj.defaulturl2 = item.snippet.thumbnails.medium.url;
                obj.defaulturl3 = item.snippet.thumbnails.high.url;
                console.log(obj);

                const vid = new Video(obj);
                vid.save().then((v) => {
                    console.log('done');
                }).catch((e) => {
                    console.log('undone');
                    return res.status(400).send(e);
                });

            });

            Video.find({}).then((users)=>{
                res.status(200).send(users);
                }).catch((error)=>{
                    res.status(400).send(e);
            })
            //res.status(201).send("Done");
            /*
            if(flag==1){
                return res.status(201).send('Done');
            }else{
                return res.status(400).send('Error');
            }
            */
        }
    })
});


app.listen(3000, ()=>{
    console.log('Server is running');
})



