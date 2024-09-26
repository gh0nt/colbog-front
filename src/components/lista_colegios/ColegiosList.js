import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Pagination from './ColegioPagination';


const ColegioList = () => {
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

        axios.get('http://localhost:8081/api/v1/colegios/find-all') //el endpoint axios.get('https://localhost:8081/swagger-ui/index.html')
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




    const handleAddClick = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/v1/colegios/find-all', newColegio);
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
        <div className="container mx-auto p-4">
            <h1 className='text-2xl font-bold mb-4'>Listado de Colegios</h1>
            <button onClick={openModal}>Añadir Nuevo Colegio</button>
            <div className="table-container">
                <table className='table-auto w-full text-left border-collapse'>
                    <thead>
                        <tr>
                            <th className='border px-4 py-2'>ID</th>
                            <th className='border px-4 py-2'>Nombre Establecimiento</th>
                            <th className='border px-4 py-2'>Zona</th>
                            <th className='border px-4 py-2'>Dirección</th>
                            <th className='border px-4 py-2'>Teléfono</th>
                            <th className='border px-4 py-2'>Tipo de Establecimiento</th>
                            <th className='border px-4 py-2'>Niveles</th>
                            <th className='border px-4 py-2'>Jornadas</th>
                            <th className='border px-4 py-2'>Especialidad</th>
                            <th className='border px-4 py-2'>Modelo Educativo</th>
                            <th className='border px-4 py-2'>Capacidades Excepcionales</th>
                            <th className='border px-4 py-2'>Discapacidades</th>
                            <th className='border px-4 py-2'>Idiomas</th>
                            <th className='border px-4 py-2'>Prestador de Servicio</th>
                            <th className='border px-4 py-2'>propiedadPlantaFisica</th>
                            <th className='border px-4 py-2'>Calendario</th>
                            <th className='border px-4 py-2'>Correo electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colegio.length > 0 ? (
                            colegio.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{item.id}</td>
                                    <td className="border px-4 py-2">{item.nombre}</td>
                                    <td className="border px-4 py-2">{item.ubicacion}</td>
                                    <td className="border px-4 py-2">{item.direccion}</td>
                                    <td className="border px-4 py-2">{item.telefono}</td>
                                    <td className="border px-4 py-2">{item.tipo}</td>
                                    <td className="border px-4 py-2">{item.niveles}</td>
                                    <td className="border px-4 py-2">{item.jornadas}</td>
                                    <td className="border px-4 py-2">{item.especialidad}</td>
                                    <td className="border px-4 py-2">{item.modelo}</td>
                                    <td className="border px-4 py-2">{item.capacidades}</td>
                                    <td className="border px-4 py-2">{item.discapacidades}</td>
                                    <td className="border px-4 py-2">{item.idiomas}</td>
                                    <td className="border px-4 py-2">{item.prestador}</td>
                                    <td className="border px-4 py-2">{item.propiedad}</td>
                                    <td className="border px-4 py-2">{item.calendario}</td>
                                    <td className="border px-4 py-2">{item.correo}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={colegio.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
                <form>


                    <label style={labelStyle}>Nombre del colegio:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.nombrecolegio}
                        onChange={(e) => setNewColegio({ ...newColegio, nombreInmueble: e.target.value })}
                    />
                    <label style={labelStyle}>Zona:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.tipoInmueble}
                        onChange={(e) => setNewColegio({ ...newColegio, tipoInmueble: e.target.value })}
                    />

                    <label style={labelStyle}>Dirección:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.ciudad}
                        onChange={(e) => setNewColegio({ ...newColegio, ciudad: e.target.value })}
                    />
                    <label style={labelStyle}>Telefono:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.departamento}
                        onChange={(e) => setNewColegio({ ...newColegio, departamento: e.target.value })}
                    />

                    <label style={labelStyle}>Tipo de Establecimiento:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.direccion}
                        onChange={(e) => setNewColegio({ ...newColegio, direccion: e.target.value })}
                    />

                    <label style={labelStyle}>Niveles:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newColegio.estrato}
                        onChange={(e) => setNewColegio({ ...newColegio, estrato: parseInt(e.target.value) })}
                    />

                    <label style={labelStyle}>Jornadas:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newColegio.valorArriendo}
                        onChange={(e) => setNewColegio({ ...newColegio, valorArriendo: parseFloat(e.target.value) })}
                    />

                    <label style={labelStyle}>Especialidad:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newColegio.areaTerreno}
                        onChange={(e) => setNewColegio({ ...newColegio, areaTerreno: parseFloat(e.target.value) })}
                    />

                    <label style={labelStyle}>Modelo Educativo:</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={newColegio.areaConstruida}
                        onChange={(e) => setNewColegio({ ...newColegio, areaConstruida: parseFloat(e.target.value) })}
                    />

                    <label style={labelStyle}>Capacidades Excepcionales:</label>
                    <input
                        style={inputStyle}
                        type="checkbox"
                        checked={newColegio.iva}
                        onChange={(e) => setNewColegio({ ...newColegio, iva: e.target.checked })}
                    />

                    <label style={labelStyle}>Discapacidades:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.nombreContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, nombreContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Idiomas:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.celularContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, celularContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Prestador del Servicio:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.telefonoContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, telefonoContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Calendario:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.direccionContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, direccionContacto: e.target.value })}
                    />

                    <label style={labelStyle}>Correo de Contacto:</label>
                    <input
                        style={inputStyle}
                        type="text"
                        value={newColegio.correoContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, correoContacto: e.target.value })}
                    />

                    <button style={submitButtonStyle} type="button" onClick={handleAddClick}>Añadir Nuevo Inmueble</button>
                    <button style={cancelButtonStyle} type="button" onClick={closeModal}>Cancelar</button>
                </form>

            </Modal>
        </div>
    );
};

export default ColegioList;