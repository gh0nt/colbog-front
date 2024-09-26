import React, { useState } from 'react';
import axios from 'axios';

const InmuebleForm = () => {
    const [formData, setFormData] = useState({
        // Define tus campos de formulario aquí...
    });

    const handleSubmit = () => {
        // Envia la solicitud HTTP para añadir/editar inmueble
        axios.post('http://localhost:8080/api/inmuebles', formData)
            .then(response => {
                // Maneja la respuesta (puede ser necesario recargar la lista de inmuebles, etc.)
            })
            .catch(error => console.error('Error submitting form: ', error));
    };

    // Renderiza el formulario...

    return (
        <div>
            {/* Renderiza el formulario aquí */}
        </div>
    );
};

export default InmuebleForm;
