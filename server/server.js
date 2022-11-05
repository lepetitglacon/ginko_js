const express = require('express')
const app = express()
const port = 3000

const fs = require("fs");
const { parse } = require("csv-parse");

const { MongoClient, ServerApiVersion } = require('mongodb');
const user = encodeURIComponent("petitglacon")
const pwd = encodeURIComponent("o#*GxdwxoqBQ*46#")
const uri = "mongodb+srv://"+ user +":"+ pwd +"@ginkojs.o4cp0bp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/', async (req, res) => {
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("ginkojs");
            const coll = db.collection("lines");
            // find code goes here
            const cursor = coll.find();
            // iterate code goes here
            await cursor.forEach(console.log);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
    res.send("lol")
})

app.get('/insert/gtfs/lines', async (req, response) => {

    function getCSVContent() {
        const data = []
        return new Promise((res, rej) => {
            fs.createReadStream("../data/gtfs-ginko/agency.txt")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", (bit) => {data.push(bit)})
                .on("end", () => {
                    res(data)
                })
        })
    }

    const data = await getCSVContent()

    console.log(data)
    let insert = [{
        id: data[0][0],
        name: data[0][1]
    }]

    async function run() {
        try {
            await client.connect();

            const db = client.db("ginkojs");
            const coll = db.collection("agency");
            coll.updateOne(
                {
                    id: data[0][0]
                },
                {
                    $set: {
                        id: data[0][0],
                        name: data[0][1]
                    }

                },
                {upsert:true}
            );

        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    response.send("ok señor")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})