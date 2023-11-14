import { useState } from 'react';
import axios from 'axios'; // Importa Axios

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [listaNombres, setListaNombres] = useState([]);

  // Manejador para actualizar el estado con el nuevo nombre
  const handleInputChange = (event) => {
    setNombreNuevo(event.target.value);
  };

  // Manejador para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    try {
      const response = await axios.post('http://127.0.0.1:8000/cliente/', { nombre: nombreNuevo });
      console.log(response.data);
      // Aquí puedes agregar el nombre nuevo a la lista de nombres si la respuesta es exitosa
      setListaNombres(prevNombres => [...prevNombres, nombreNuevo]);
      setNombreNuevo(''); // Limpia el input después de enviar
    } catch (error) {
      console.error('Hubo un error al enviar el nombre', error);
    }
  };

  // Manejador para obtener los nombres
  // Manejador para obtener los nombres
  // Manejador para obtener los nombres
  const handleMostrarNombres = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cliente/');
      // Verifica que la respuesta contiene la propiedad 'clientes' que es un arreglo
      if (Array.isArray(response.data.clientes)) {
        setListaNombres(response.data.clientes.map(cliente => cliente.nombre));
        console.log(listaNombres)
        console.log(response.data)
      } else {
        // Si no es un arreglo, podrías querer manejar el error o establecer un arreglo vacío
        console.error('La respuesta no contiene un arreglo de clientes');
        setListaNombres([]);
      }
    } catch (error) {
      console.error('Hubo un error al obtener los clientes', error);
      // Manejar el error o establecer un arreglo vacío
      setListaNombres([]);
    }
  };



  return (
    <>
      <div>
        <h1>Hola</h1>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="nombre" className="col-form-label">Nombre</label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={nombreNuevo}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Agregar</button>
          </div>
        </form>

        <h1>Nombres ingresados</h1>
        <button onClick={handleMostrarNombres} className="btn btn-primary">Mostrar</button>
        <div>
          <ul className="list-group">
            {listaNombres.map((nombre, index) => (
              <li key={index} className="list-group-item">{nombre}</li>
            ))}
          </ul>

        </div>
      </div>
    </>
  );
}

export default App;
