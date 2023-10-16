const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "empleados_crud"
});

// extraer datos y registrarlo en la base de datos empleados
app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)', [nombre, edad, pais, cargo, anios], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: "Error al registrar el empleado"
            });
        } else {
            res.send(result);
        }
    });
});

// consultar base de datos empleados y devolver los registros encontrados (LISTAR) = traer informacion
app.get("/empleados", (req, res) => {

    db.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: "Error al consultar datos del empleado"
            });
        } else {
            res.send(result);
        }
    });
});

// actualizar
app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: "Error al actualizar datos del empleado"
            });
        } else {
            res.send(result);
        }
    });
});

// eliminar
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM empleados WHERE id=?',[id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: "Error al eliminar datos del empleado"
            });
        } else {
            res.send(result);
        }
    });
});


app.listen(3001, ()=> {
    console.log("Corriendo en el puerto 3001");
})  