const cors = require('cors');// imporanto biblioteca cors 

const express = require('express'); // Importa o modulo express
const app = express(); // cria uma variavel que chama a a função express

const port = process.env.PORT || 3333;
app.listen(port); // faz com que o servidor node seja executado na porta 3000.... localhost:3000

// configurando CORS
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

app.listen(port, () => {
    console.log('Server online!!');
})

app.get('/', (req, res) => {
    res.send("ooi");
})


