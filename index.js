const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var DB = {
    games: [
        {
            id: 1,
            name: 'Game 1',
            year: '2018',
            price: 21
        },
        {
            id: 2,
            name: 'Game 2',
            year: '2019',
            price: 22
        },
        {
            id: 3,
            name: 'Game 3',
            year: '2020',
            price: 23
        }
    ]
}
app.get("/games",(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
       res.sendStatus( 400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id === id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }

    }
});
app.post("/game",(req,res)=>{
    var{name,year,price} = req.body;
    DB.games.push({
        id: 4,
        name,
        year,
        price
    });
    res.sendStatus(200);
});
app.delete("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id === id);
        if(game != undefined){
            DB.games.splice(DB.games.indexOf(game),1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
}
);
app.put("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id === id);
        if(game != undefined){
            var{name,year,price} = req.body;
            game.name = name;
            game.year = year;
            game.price = price;
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
}   
);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);