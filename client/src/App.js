import './App.css';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';


function App() {

  // gestionar estados, tener acceso a los valores que se escribe el usuario escribe
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  // agregar
  const add = () => {
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado con exito!</i>",
        icon: 'success'
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logró registrar el empleado!',
          footer: error.axiosError
        })
      });
    });
  }


  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  // listar datos - llamada al API que tiene la informacion y extraer datos
  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }

  // actualizar
  const update = () => {
    axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con exito!</i>",
        icon: 'success'
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logró actualizar el empleado!',
          footer: error.axiosError
        })
      });
    })
  }

  // cancelar
  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
    setAnios("");

    setEditar(false);
  }

  // eliminar
  const deleteEmple = (val) => {
    Swal.fire({
      title: 'Eliminar',
      html: "<i>Realmente deseas elimiar a <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire(
            'Eliminado!',
            val.nombre + ' fue eliminado.',
            'success'
          );
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado!',
            footer: error.axiosError
          })
        });
      }
    });
  }

  getEmpleados();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              onChange={(event) => setNombre(event.target.value)}
              className="form-control" value={nombre} placeholder="Ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number"
              onChange={(event) => setEdad(event.target.value)}
              className="form-control" value={edad} placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais</span>
            <input type="text"
              onChange={(event) => setPais(event.target.value)}
              className="form-control" value={pais} placeholder="Ingrese su pais" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input type="text"
              onChange={(event) => setCargo(event.target.value)}
              className="form-control" value={cargo} placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia</span>
            <input type="number"
              onChange={(event) => setAnios(event.target.value)}
              className="form-control" value={anios} placeholder="Ingrese años de experiencia" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
        </div>

        <div className="card-footer text-muted">
          {
            editar === true ?
              <div>
                <button className='btn btn-warning m-2' onClick={update} >Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos} >Cancelar</button>
              </div>
              :
              <button className='btn btn-success' onClick={add} >Registrar</button>
          }
        </div>

      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button"
                      onClick={() => {
                        deleteEmple(val);
                      }}
                      className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
