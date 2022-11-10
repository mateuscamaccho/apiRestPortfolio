const express = require("express")
const fs = require('fs')
const cors = require('cors');// imporanto biblioteca cors 

const app = express();

corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
// fim cors

//configurando express
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
//express

const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send('Servidor ativo!')
})


app.put("/access", (req, res) => {
    var dataHora = new Date();
    var zHora = zero(dataHora.getHours());
    var zMinuto = zero(dataHora.getMinutes());
    var zSegundo = zero(dataHora.getSeconds());
    var zDia = zero(dataHora.getDate());
    var zMes = zero((dataHora.getMonth() + 1));
    var zAno = zero(dataHora.getFullYear())
    var now = zDia + '/' + zMes + '/' + zAno + ' ' + zHora + ':' + zMinuto + ':' + zSegundo
    
    function zero(x) {
        if (x < 10) {
            x = '0' + x;
        }
        return x;
    }
    
    try {
        var file = fs.readFileSync("db/db.txt", 'utf-8');
        const data = JSON.parse(file)
        var ultimo = data[data.length - 1];
        var newId = 0;
        if (ultimo <= 0 || ultimo == undefined || ultimo == null) {
            newId = 1
        } else {
            newId = ultimo.id + 1;
        }
        let access = {
            id: newId,
            date: now
        };
        data.push(access);
        fs.writeFile("db/db.txt", JSON.stringify(data), err => { });
        res.json({ "codigo": 1, "acesso": access })
    } catch {
        res.json({ "codigo": 0, "mensagem": "Não foi possivel inserir acesso" })
    }
})

app.get("/access", (req, res) => {
    try {
        var file = fs.readFileSync("db/db.txt", 'utf-8');
        const data = JSON.parse(file)

        let count = data.length

        res.json({ "codigo": 1, "acessos": count  })
    } catch {
        res.json({ "codigo": 0, "mensagem": "Não foi possivel contar os acessos!"})
    }
})

app.delete("/access", (req, res) => {
    try {
        fs.writeFile("db/db.txt", '[]', err => { });
        res.json({ "codigo": 1 })
    } catch {
        res.json({ "codigo": 0, "mensagem": "Não foi possivel limpar os acessos" })
    }
})

app.listen(port, () => {
    console.log("Servidor Online!")
})
