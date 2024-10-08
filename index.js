const express = required('express');
const mysql = required('mysql');
const bodyParser = required('body-parser');

//criar uma instancia do express
const app = express();
app.use(bodyParser.json())

//conexao com o BD
const db = mysql.createConnection({
    host: 'local host',
    user: 'root',
    password: '',
    database: 'api'
});

//conexao com o banco de dados 
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o Banco de dados');
        return;
    }
    console.log('Conectado com sucesso!');
});

//Inserir os dados
app.post('/usuario', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e e-mail são obirgatórios!' });
    }
    const query = 'INSERT INTO usuario(nome, email) VALUES(?,?) ';
    db.query(query, [nome, emaail], (err, result) => {
        if (err) {
            console.error('Erro ao inserir os Dados', err);
            return res.status(500).json({ message: 'Erro ao inserir os Dados' });
        }
        res.status(201).json({ message: 'Usuario inserido com sucesso!', userId: result.insertId });

    });

});

//iniciar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidror Rodando na Porta ${PORT}`);
});
