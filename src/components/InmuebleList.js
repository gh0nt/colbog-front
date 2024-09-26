import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Pagination from './Pagination';
import './InmuebleList.css';

const InmuebleList = () => {
    const [inmuebles, setInmuebles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemsPerPage] = useState(10);
    const [editingId, setEditingId] = useState(null);
    const [newInmueble, setNewInmueble] = useState({
        ID: 1,
        codigoSAE: '',
        nombreInmueble: '',
        tipoInmueble: '',
        ciudad: '',
        departamento: '',
        direccion: '',
        estrato: 0,
        valorArriendo: 0.0,
        areaTerreno: 0.0,
        areaConstruida: 0.0,
        iva: false,
        nombreContacto: '',
        celularContacto: '',
        telefonoContacto: '',
        direccionContacto: '',
        correoContacto: '',
        paginaWebContacto: '',
        estadoInmueble: '',
        tipoDisponible: '',
    });

    useEffect(() => {
        axios.get('https://8vz3hknr-8080.use2.devtunnels.ms/api/inmuebles')
            .then(response => setInmuebles(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = useMemo(() => inmuebles.slice(indexOfFirstItem, indexOfLastItem), [inmuebles, indexOfFirstItem, indexOfLastItem]);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`https://8vz3hknr-8080.use2.devtunnels.ms/api/inmuebles/${id}`);
            setInmuebles(inmuebles.filter(inmueble => inmueble.idInmueble !== id));
        } catch (error) {
            console.error('Error deleting inmueble: ', error);
        }
    };

    const handleSaveClick = async (editedInmueble) => {
        try {
            await axios.put(`https://8vz3hknr-8080.use2.devtunnels.ms/api/inmuebles/${editedInmueble.idInmueble}`, editedInmueble);
            setEditingId(null);
        } catch (error) {
            console.error('Error updating inmueble: ', error);
        }
    };

    const handleAddClick = async () => {
        try {
            const response = await axios.post('https://8vz3hknr-8080.use2.devtunnels.ms/api/inmuebles', newInmueble);
            setInmuebles([...inmuebles, response.data]);
            setNewInmueble({
                ID: 0,
                codigoSAE: '',
                nombreInmueble: '',
                tipoInmueble: '',
                ciudad: '',
                departamento: '',
                direccion: '',
                estrato: 0,
                valorArriendo: 0.0,
                areaTerreno: 0.0,
                areaConstruida: 0.0,
                iva: false,
                nombreContacto: '',
                celularContacto: '',
                telefonoContacto: '',
                direccionContacto: '',
                correoContacto: '',
                paginaWebContacto: '',
                estadoInmueble: '',
                tipoDisponible: '',
            });
            closeModal();
        } catch (error) {
            console.error('Error adding inmueble: ', error);
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
            <h2>Listado de Inmuebles</h2>
            <button onClick={openModal}>Añadir Nuevo Inmueble</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>ID</th>
                            <th>Código SAE</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Ciudad</th>
                            <th>Departamento</th>
                            <th>Dirección</th>
                            <th>Estrato</th>
                            <th>Valor de Arriendo</th>
                            <th>Área de Terreno</th>
                            <th>Área Construida</th>
                            <th>IVA</th>
                            <th>Nombre de Contacto</th>
                            <th>Celular de Contacto</th>
                            <th>Teléfono de Contacto</th>
                            <th>Dirección de Contacto</th>
                            <th>Correo de Contacto</th>
                            <th>Página Web de Contacto</th>
                            <th>Estado del Inmueble</th>
                            <th>Tipo Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(inmueble => (
                            <tr key={inmueble.idInmueble}>
                                <td>
                                    {editingId === inmueble.idInmueble ? (
                                        <>
                                            <button onClick={() => handleSaveClick(inmueble)}>Guardar</button>
                                            <button onClick={() => setEditingId(null)}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(inmueble.idInmueble)}>Editar</button>
                                            <button onClick={() => handleDeleteClick(inmueble.idInmueble)}>Eliminar</button>
                                        </>
                                    )}
                                </td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.idInmueble}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, codigoSAE: e.target.value } : i))}
                                    />
                                ) : inmueble.idInmueble}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.codigoSAE}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, codigoSAE: e.target.value } : i))}
                                    />
                                ) : inmueble.codigoSAE}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.nombreInmueble}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, nombreInmueble: e.target.value } : i))}
                                    />
                                ) : inmueble.nombreInmueble}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.tipoInmueble}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, tipoInmueble: e.target.value } : i))}
                                    />
                                ) : inmueble.tipoInmueble}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.ciudad}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, ciudad: e.target.value } : i))}
                                    />
                                ) : inmueble.ciudad}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.departamento}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, departamento: e.target.value } : i))}
                                    />
                                ) : inmueble.departamento}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.direccion}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, direccion: e.target.value } : i))}
                                    />
                                ) : inmueble.direccion}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.estrato}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, estrato: e.target.value } : i))}
                                    />
                                ) : inmueble.estrato}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.valorArriendo}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, valorArriendo: e.target.value } : i))}
                                    />
                                ) : inmueble.valorArriendo}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.areaTerreno}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, areaTerreno: e.target.value } : i))}
                                    />
                                ) : inmueble.areaTerreno}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.areaConstruida}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, areaConstruida: e.target.value } : i))}
                                    />
                                ) : inmueble.areaConstruida}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.iva}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, iva: e.target.value } : i))}
                                    />
                                ) : inmueble.iva}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.nombreContacto}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, nombreContacto: e.target.value } : i))}
                                    />
                                ) : inmueble.nombreContacto}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.celularContacto}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, celularContacto: e.target.value } : i))}
                                    />
                                ) : inmueble.celularContacto}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.telefonoContacto}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, telefonoContacto: e.target.value } : i))}
                                    />
                                ) : inmueble.telefonoContacto}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.direccionContacto}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, direccionContacto: e.target.value } : i))}
                                    />
                                ) : inmueble.direccionContacto}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.correoContacto}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, correoContacto: e.target.value } : i))}
                                    />
                                ) : inmueble.correoContacto}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.paginaWebContacto}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, paginaWebContacto: e.target.value } : i))}
                                    />
                                ) : inmueble.paginaWebContacto}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.estadoInmueble}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, estadoInmueble: e.target.value } : i))}
                                    />
                                ) : inmueble.estadoInmueble}</td>
                                <td>{editingId === inmueble.idInmueble ? (
                                    <input
                                        type="text"
                                        value={inmueble.tipoDisponible}
                                        onChange={(e) => setInmuebles(inmuebles.map(i => i.idInmueble === inmueble.idInmueble ? { ...i, tipoDisponible: e.target.value } : i))}
                                    />
                                ) : inmueble.tipoDisponible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={inmuebles.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}  style={modalStyle}>
                <form>
                    <label style={labelStyle}>Código SAE:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.codigoSAE}
                        onChange={(e) => setNewInmueble({ ...newInmueble, codigoSAE: e.target.value })}
                    />

                    <label style={labelStyle}>Nombre del Inmueble:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.nombreInmueble}
                        onChange={(e) => setNewInmueble({ ...newInmueble, nombreInmueble: e.target.value })}
                    />
                    <label style={labelStyle}>Tipo de Inmueble:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.tipoInmueble}
                        onChange={(e) => setNewInmueble({ ...newInmueble, tipoInmueble: e.target.value })}
                    />

                    <label style={labelStyle}>Ciudad:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.ciudad}
                        onChange={(e) => setNewInmueble({ ...newInmueble, ciudad: e.target.value })}
                    />
                    <label style={labelStyle}>Departamento:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.departamento}
                        onChange={(e) => setNewInmueble({ ...newInmueble, departamento: e.target.value })}
                    />

                    <label style={labelStyle}>Dirección:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.direccion}
                        onChange={(e) => setNewInmueble({ ...newInmueble, direccion: e.target.value })}
                    />

                    <label style={labelStyle}>Estrato:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newInmueble.estrato}
                        onChange={(e) => setNewInmueble({ ...newInmueble, estrato: parseInt(e.target.value) })}
                    />

                    <label style={labelStyle}>Valor de Arriendo:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newInmueble.valorArriendo}
                        onChange={(e) => setNewInmueble({ ...newInmueble, valorArriendo: parseFloat(e.target.value) })}
                    />

                    <label style={labelStyle}>Área del Terreno:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newInmueble.areaTerreno}
                        onChange={(e) => setNewInmueble({ ...newInmueble, areaTerreno: parseFloat(e.target.value) })}
                    />

                    <label style={labelStyle}>Área Construida:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newInmueble.areaConstruida}
                        onChange={(e) => setNewInmueble({ ...newInmueble, areaConstruida: parseFloat(e.target.value) })}
                    />

                    <label style={labelStyle}>IVA:</label>
                    <input
                        style={inputStyle}
                        type="checkbox"
                        checked={newInmueble.iva}
                        onChange={(e) => setNewInmueble({ ...newInmueble, iva: e.target.checked })}
                    />

                    <label style={labelStyle}>Nombre de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.nombreContacto}
                        onChange={(e) => setNewInmueble({ ...newInmueble, nombreContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Celular de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.celularContacto}
                        onChange={(e) => setNewInmueble({ ...newInmueble, celularContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Teléfono de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.telefonoContacto}
                        onChange={(e) => setNewInmueble({ ...newInmueble, telefonoContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Dirección de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.direccionContacto}
                        onChange={(e) => setNewInmueble({ ...newInmueble, direccionContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Correo de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.correoContacto}
                        onChange={(e) => setNewInmueble({ ...newInmueble, correoContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Página Web de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.paginaWebContacto}
                        onChange={(e) => setNewInmueble({ ...newInmueble, paginaWebContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Estado del Inmueble:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.estadoInmueble}
                        onChange={(e) => setNewInmueble({ ...newInmueble, estadoInmueble: e.target.value })}
                    />

                    <label style={labelStyle}>Tipo Disponible:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newInmueble.tipoDisponible}
                        onChange={(e) => setNewInmueble({ ...newInmueble, tipoDisponible: e.target.value })}
                    />

                    <button style={submitButtonStyle} type="button" onClick={handleAddClick}>Añadir Nuevo Inmueble</button>
                    <button style={cancelButtonStyle} type="button" onClick={closeModal}>Cancelar</button>
                </form>
                
            </Modal>
        </div>
    );
};

export default InmuebleList;
