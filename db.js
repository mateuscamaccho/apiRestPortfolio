async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createPool("mysql://gssensormain:Ovridapa032!@187.45.196.194/gssensormain");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function db_select() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT count(*) as acessos FROM `mateus`;');
    return rows;
}

async function db_insert(data){
    const conn = await connect();
    const sql = 'INSERT INTO mateus(date) VALUES (?);';
    const values = [data.date];
    return await conn.query(sql, values);    
}

async function db_update(id, customer){
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?';
    const values = [customer.nome, customer.idade, customer.uf, id];
    return await conn.query(sql, values);
}

async function db_delete(id){
    const conn = await connect();
    const sql = 'DELETE FROM mateus where id=?;';
    return await conn.query(sql, [id]);
}

module.exports = { db_select, db_insert, db_update, db_delete  }