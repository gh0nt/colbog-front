import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Pagination from './ColegioPagination_user';
import './ColegioList.css';

const ColegiosList = () => {
    const [colegio, setColegio] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemsPerPage] = useState(10);
    const [editingId, setEditingId] = useState(null);
    const [newColegio, setNewColegio] = useState({
        id: 1,
        nombreEstablecimiento: "",
        zona: "",
        direccion: "",
        telefono: "",
        tipoEstablecimiento: "",
        niveles: "",
        jornadas: "",
        especialidad: null,
        modelosEducativos: "",
        capacidadesExcepcionales: null,
        discapacidades: null,
        idiomas: "",
        prestadorDeServicio: "",
        propiedadPlantaFisica: "",
        calendario: "",
        correoElectronico: ""
    });

    useEffect(() => {

        axios.get('') //el endpoint axios.get('https://localhost:5001/api/Colegios')
            .then(response => {
                const colegioData = Array.isArray(response.data) ? response.data : [];
                setColegio(colegioData)
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = useMemo(() => {
        return Array.isArray(colegio) ? colegio.slice(indexOfFirstItem, indexOfLastItem) : [];
    }, [colegio, indexOfFirstItem, indexOfLastItem]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete('https://localhost:5001/api/Colegios'); //ubicar el endpoint y eliminar desde el /${id}` axios.get('https://localhost:5001/api/Colegios')
            setColegio(colegio.filter(colegio => colegio.idColegio !== id));
        } catch (error) {
            console.error('Error deleting colegio: ', error);
        }
    };

    const handleSaveClick = async (editedColegio) => {
        try {
            await axios.put(`https://localhost:5001/api/Colegios/${editedColegio.idColegio}`, editedColegio);  //ubicar el endpoint y eliminar desde el /${id}` axios.get('https://localhost:5001/api/Colegios')
            setEditingId(null);
        } catch (error) {
            console.error('Error updating colegios: ', error);
        }
    };

    const handleAddClick = async () => {
        try {
            const response = await axios.post('https://localhost:5001/api/Colegios', newColegio);
            setColegio([...colegio, response.data]);
            setNewColegio({
                id: 1,
                nombreEstablecimiento: "",
                zona: "",
                direccion: "",
                telefono: "",
                tipoEstablecimiento: "",
                niveles: "",
                jornadas: "",
                especialidad: null,
                modelosEducativos: "",
                capacidadesExcepcionales: null,
                discapacidades: null,
                idiomas: "",
                prestadorDeServicio: "",
                propiedadPlantaFisica: "",
                calendario: "",
                correoElectronico: ""
            });
            closeModal();
        } catch (error) {
            console.error('Error adding colegio: ', error);
        }
    };

    const modalStyle = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    const labelStyle = {
        marginBottom: '8px',
        marginRight: '8px',
        width: '180px', // Ajusta el ancho según tus necesidades
    };

    const inputStyle = {
        flex: '1',
        padding: '10px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '12px',
    };

    const submitButtonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const cancelButtonStyle = {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div className="inmueble-list-container">
            <h2>Listado de Colegios</h2>
            <button onClick={openModal}>Añadir Nuevo Colegio</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Establecimiento</th>
                            <th>Zona</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Tipo de Establecimiento</th>
                            <th>Niveles</th>
                            <th>Jornadas</th>
                            <th>Especialidad</th>
                            <th>Modelo Educativo</th>
                            <th>Capacidades Excepcionales</th>
                            <th>Discapacidades</th>
                            <th>Idiomas</th>
                            <th>Prestador de Servicio</th>
                            <th>propiedadPlantaFisica</th>
                            <th>Calendario</th>
                            <th>Correo electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(colegio => (
                            <tr key={colegio.idColegio}>
                                <td>
                                    {editingId === colegio.idColegio ? (
                                        <>
                                            <button onClick={() => handleSaveClick(colegio)}>Guardar</button>
                                            <button onClick={() => setEditingId(null)}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(colegio.idColegio)}>Editar</button>
                                            <button onClick={() => handleDeleteClick(colegio.idColegio)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.idColegio}
                                        onChange={(e) => setColegio(colegio.map(i => i.ID === colegio.idColegio ? { ...i, id: e.target.value } : i))}
                                    />
                                ) : colegio.idColegio}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.nombreEstablecimiento}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, nombreEstablecimiento: e.target.value } : i))}
                                    />
                                ) : colegio.nombreEstablecimiento}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.zona}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, zona: e.target.value } : i))}
                                    />
                                ) : colegio.zona}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.tipoInmueble}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, tipoInmueble: e.target.value } : i))}
                                    />
                                ) : colegio.tipoInmueble}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.ciudad}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, ciudad: e.target.value } : i))}
                                    />
                                ) : colegio.ciudad}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.departamento}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, departamento: e.target.value } : i))}
                                    />
                                ) : colegio.departamento}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.direccion}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, direccion: e.target.value } : i))}
                                    />
                                ) : colegio.direccion}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.estrato}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, estrato: e.target.value } : i))}
                                    />
                                ) : colegio.estrato}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.valorArriendo}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, valorArriendo: e.target.value } : i))}
                                    />
                                ) : colegio.valorArriendo}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.areaTerreno}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, areaTerreno: e.target.value } : i))}
                                    />
                                ) : colegio.areaTerreno}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.areaConstruida}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, areaConstruida: e.target.value } : i))}
                                    />
                                ) : colegio.areaConstruida}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.iva}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, iva: e.target.value } : i))}
                                    />
                                ) : colegio.iva}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.nombreContacto}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, nombreContacto: e.target.value } : i))}
                                    />
                                ) : colegio.nombreContacto}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.celularContacto}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, celularContacto: e.target.value } : i))}
                                    />
                                ) : colegio.celularContacto}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.telefonoContacto}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, telefonoContacto: e.target.value } : i))}
                                    />
                                ) : colegio.telefonoContacto}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.direccionContacto}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, direccionContacto: e.target.value } : i))}
                                    />
                                ) : colegio.direccionContacto}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.correoContacto}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, correoContacto: e.target.value } : i))}
                                    />
                                ) : colegio.correoContacto}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.paginaWebContacto}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, paginaWebContacto: e.target.value } : i))}
                                    />
                                ) : colegio.paginaWebContacto}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.estadocolegio}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, estadocolegio: e.target.value } : i))}
                                    />
                                ) : colegio.estadocolegio}</td>
                                <td>{editingId === colegio.idColegio ? (
                                    <input
                                        type="text"
                                        value={colegio.tipoDisponible}
                                        onChange={(e) => setColegio(colegio.map(i => i.idColegio === colegio.idColegio ? { ...i, tipoDisponible: e.target.value } : i))}
                                    />
                                ) : colegio.tipoDisponible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={colegio.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            
        </div>
    );
};

export default ColegiosList;
