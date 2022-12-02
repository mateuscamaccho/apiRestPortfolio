const express = require("express")
const fs = require('fs')
const cors = require('cors');// imporanto biblioteca cors 

const app = express();

const db = require("./db")

// corsOptions = {
//     origin: '*'
// }

// app.use(cors(corsOptions))
// fim cors

//configurando express
app.use((req, res, next) => {
    express.urlencoded({
        extended: true
    })

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    app.use(cors());
    
    next();
});


app.use(express.json())
//express

const port = process.env.PORT || 3333;

app.get("/", async (req, res) => {

    res.send("Server online!")

})


app.put("/access", async (req, res) => {
    var dataHora = new Date();
    var zHora = zero(dataHora.getHours());
    var zMinuto = zero(dataHora.getMinutes());
    var zSegundo = zero(dataHora.getSeconds());
    var zDia = zero(dataHora.getDate());
    var zMes = zero((dataHora.getMonth() + 1));
    var zAno = zero(dataHora.getFullYear())
    var now = zAno + '-' + zMes + '/' + zDia + ' ' + zHora + ':' + zMinuto + ':' + zSegundo

    function zero(x) {
        if (x < 10) {
            x = '0' + x;
        }
        return x;
    }

    try {
        const result = await db.db_insert({ date: now });
        const acessos = await db.db_select();
        res.status(201).json({ mensagem: "Criado com sucesso!", acessos: acessos[0].acessos })
    } catch {
    }

})

app.get("/access", async (req, res) => {
    try {
        const acessos = await db.db_select();
        if (acessos.length <= 0) {
            res.status(204).json({ mensagem: "nenhum resultado encontrado" })
        }
        res.json(acessos[0]);
    } catch {
        res.status(404).json({ mensagem: "Não foi possivel consultar!" })
    }
})

app.get("/show", async (req, res) => {
    try {
        const acessos = await db.db_select_show();
        if (acessos.length <= 0) {
            res.status(204).json({ mensagem: "nenhum resultado encontrado" })
        }
        res.json(acessos);
    } catch {
        res.status(404).json({ mensagem: "Não foi possivel consultar!" })
    }
})

// app.delete("/access/:id", async (req, res) => {
//     try {
//         const result3 = await db.db_delete(req.params.id);
//         console.log(result3);
//         const acessos = await db.db_select();
//         res.json(acessos);
//     } catch {
//         res.json({ id: 1 })
//     }

// })

app.listen(port, () => {
    console.log("Servidor Online!")
})
