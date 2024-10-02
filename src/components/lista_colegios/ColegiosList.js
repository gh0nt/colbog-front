import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Pagination from './ColegioPagination';
import SearchFilterAdmin from './SearchFilterAdmin';

const ColegioList = () => {
    const [colegio, setColegio] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredColegios, setFilteredColegios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentColegioId, setCurrentColegioId] = useState(null);
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
        fetchColegios();
    }, []);

    const fetchColegios = () => {
        axios.get('http://localhost:8081/api/v1/colegios/find-all')
            .then(response => {
                const colegioData = Array.isArray(response.data) ? response.data : [];
                setColegio(colegioData);
                setFilteredColegios(colegioData);
            })
            .catch(error => console.error('Error fetching data: ', error));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentColegios = filteredColegios.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = () => {
        setIsModalOpen(true);
        setIsEditing(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
        setCurrentColegioId(null);
    };

    const handleSearch = (filters) => {
        const { nombreEstablecimiento, zona, niveles, jornadas, especialidad, idiomas, calendario } = filters;

        const filtered = colegio.filter((colegio) => {
            const matchesSearchTerm = colegio.nombreEstablecimiento?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesNombreEstablecimiento = nombreEstablecimiento ? colegio.nombreEstablecimiento === nombreEstablecimiento : true;
            const matchesZona = zona ? colegio.zona === zona : true;
            const matchesNiveles = niveles ? colegio.niveles === niveles : true;
            const matchesJornadas = jornadas ? colegio.jornadas === jornadas : true;
            const matchesEspecialidad = especialidad ? colegio.especialidad === especialidad : true;
            const matchesIdiomas = idiomas ? colegio.idiomas === idiomas : true;
            const matchesCalendario = calendario ? colegio.calendario === calendario : true;

            return matchesSearchTerm && matchesNombreEstablecimiento && matchesZona && matchesNiveles &&
                matchesJornadas && matchesEspecialidad && matchesIdiomas && matchesCalendario;
        });
        setFilteredColegios(filtered);
        setCurrentPage(1);
    };

    const handleEdit = (colegio) => {
        setIsEditing(true);
        setNewColegio(colegio);
        setCurrentColegioId(colegio.id);
        setIsModalOpen(true);
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



    return (
        <div className="container mx-auto px-4 md:px-6">
            <h1 className='text-3xl font-bold mb-6 text-center'>Listado de Colegios</h1>

            <div className="flex justify-between mb-4">
                <SearchFilterAdmin onSearch={handleSearch} />
                <button className="bg-blue-500 text-white px-2 py-2 rounded" onClick={openModal}>Añadir Colegio</button>
            </div>

            <div className="overflow-x-auto">
                <table className='table-auto w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='border px-4 py-2'>Acciones</th>
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
                            <th className='border px-4 py-2'>Propiedad Planta Física</th>
                            <th className='border px-4 py-2'>Calendario</th>
                            <th className='border px-4 py-2'>Correo electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentColegios.length > 0 ? (
                            currentColegios.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2 flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">{item.id}</td>
                                    <td className="border px-4 py-2">{item.nombreEstablecimiento}</td>
                                    <td className="border px-4 py-2">{item.zona}</td>
                                    <td className="border px-4 py-2">{item.direccion}</td>
                                    <td className="border px-4 py-2">{item.telefono}</td>
                                    <td className="border px-4 py-2">{item.tipoEstablecimiento}</td>
                                    <td className="border px-4 py-2">{item.niveles}</td>
                                    <td className="border px-4 py-2">{item.jornadas}</td>
                                    <td className="border px-4 py-2">{item.especialidad}</td>
                                    <td className="border px-4 py-2">{item.modelosEducativos}</td>
                                    <td className="border px-4 py-2">{item.capacidadesExcepcionales}</td>
                                    <td className="border px-4 py-2">{item.discapacidades}</td>
                                    <td className="border px-4 py-2">{item.idiomas}</td>
                                    <td className="border px-4 py-2">{item.prestadorDeServicio}</td>
                                    <td className="border px-4 py-2">{item.propiedadPlantaFisica}</td>
                                    <td className="border px-4 py-2">{item.calendario}</td>
                                    <td className="border px-4 py-2">{item.correoElectronico}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="18" className="text-center py-4">No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredColegios.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Colegio' : 'Añadir Nuevo Colegio'}</h2>
                <form onSubmit={handleFormSubmit}>
                    <label className="block mb-2">Nombre del colegio:</label>
                    <input
                        type="text"
                        value={newColegio.nombreEstablecimiento}
                        onChange={(e) => setNewColegio({ ...newColegio, nombreEstablecimiento: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Zona:</label>
                    <input
                        type="text"
                        value={newColegio.zona}
                        onChange={(e) => setNewColegio({ ...newColegio, zona: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Dirección:</label>
                    <input
                        type="text"
                        value={newColegio.direccion}
                        onChange={(e) => setNewColegio({ ...newColegio, direccion: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Teléfono:</label>
                    <input
                        type="text"
                        value={newColegio.telefono}
                        onChange={(e) => setNewColegio({ ...newColegio, telefono: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Tipo de Establecimiento:</label>
                    <input
                        type="text"
                        value={newColegio.tipoEstablecimiento}
                        onChange={(e) => setNewColegio({ ...newColegio, tipoEstablecimiento: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Niveles:</label>
                    <input
                        type="text"
                        value={newColegio.niveles}
                        onChange={(e) => setNewColegio({ ...newColegio, niveles: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Jornadas:</label>
                    <input
                        type="text"
                        value={newColegio.jornadas}
                        onChange={(e) => setNewColegio({ ...newColegio, jornadas: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Especialidad:</label>
                    <input
                        type="text"
                        value={newColegio.especialidad}
                        onChange={(e) => setNewColegio({ ...newColegio, especialidad: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Modelo Educativo:</label>
                    <input
                        type="text"
                        value={newColegio.modelosEducativos}
                        onChange={(e) => setNewColegio({ ...newColegio, modelosEducativos: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Capacidades Excepcionales:</label>
                    <input
                        type="text"
                        value={newColegio.capacidadesExcepcionales}
                        onChange={(e) => setNewColegio({ ...newColegio, capacidadesExcepcionales: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Discapacidades:</label>
                    <input
                        type="text"
                        value={newColegio.discapacidades}
                        onChange={(e) => setNewColegio({ ...newColegio, discapacidades: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Idiomas:</label>
                    <input
                        type="text"
                        value={newColegio.idiomas}
                        onChange={(e) => setNewColegio({ ...newColegio, idiomas: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Prestador del Servicio:</label>
                    <input
                        type="text"
                        value={newColegio.prestadorDeServicio}
                        onChange={(e) => setNewColegio({ ...newColegio, prestadorDeServicio: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Propiedad Planta Física:</label>
                    <input
                        type="text"
                        value={newColegio.propiedadPlantaFisica}
                        onChange={(e) => setNewColegio({ ...newColegio, propiedadPlantaFisica: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Calendario:</label>
                    <input
                        type="text"
                        value={newColegio.calendario}
                        onChange={(e) => setNewColegio({ ...newColegio, calendario: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <label className="block mb-2">Correo Electrónico:</label>
                    <input
                        type="text"
                        value={newColegio.correoElectronico}
                        onChange={(e) => setNewColegio({ ...newColegio, correoElectronico: e.target.value })}
                        className="border rounded px-2 py-1 mb-4 w-full"
                    />
                    <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            {isEditing ? 'Actualizar' : 'Añadir'}
                        </button>
                        <button type="button" onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ColegioList;

