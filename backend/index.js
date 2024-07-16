const express = require('express');
const cors = require('cors');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executecpp');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Welcome everyone to our today's class")
});

app.post('/run', async(req, res)=>{
    const {language = 'cpp', code} = req.body;

    if(code === undefined) {
        return res.status(500).json({"success" : false, message: "Empty code body!"})
    }

    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({filePath, output});
    } catch (error) {
        return res.status(500).json({"success" : false, message: error.message})
    }
});

app.listen(5000, () => {
    console.log('Example app listens at http://localhost:5000')
});

//uuid: 