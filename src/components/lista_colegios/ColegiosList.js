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
    }, []);

    //Calcular el índice de los colegios para mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentColegios = colegio.slice(indexOfFirstItem, indexOfLastItem);

    //Cambia a la página actual
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //Recibe el SearchFilterAdmin.js
    const handleSearch = (filters) => {
        const { nombreEstablecimiento, zona, niveles, jornadas, especialidad, idiomas, calendario } = filters;

        const filtered = colegio.filter((colegio) => {
            const matchesSearchTerm = colegio.nombreEstablecimiento?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesNombreEstablecimiento = nombreEstablecimiento ? colegio.nombreEstablecimiento === colegio : true;
            const matchesZona = zona ? colegio.zona === zona : true;
            const matchesNiveles = niveles ? colegio.niveles === niveles : true;
            const matchesJornadas = niveles ? colegio.jornadas === jornadas : true;
            const matchesEspecialidad = especialidad ? colegio.especialidad === especialidad : true;
            const matchesIdiomas = idiomas ? colegio.idiomas === idiomas : true;
            const matchesCalendario = calendario ? colegio.calendario === calendario : true;

            return matchesSearchTerm && matchesZona && matchesNiveles && matchesJornadas && matchesEspecialidad && matchesIdiomas && matchesCalendario;
        });
        setFilteredColegios(filtered);
        setCurrentPage(1);
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
        <div className="px-4 md:px-6">
            <h1 className='text-2xl font-bold mb-4'>Listado de Colegios</h1>
            {/* Componente de Búsqueda */}
            <SearchFilterAdmin onSearch={handleSearch} />

            <button onClick={openModal}>Añadir Nuevo Colegio</button>
            <div className="overflow-x-auto mx-auto">
                <table className='table-auto border-collapse w-full'>
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
                        {currentColegios.length > 0 ? (
                            currentColegios.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{item.id}</td>
                                    <td className="border px-4 py-2">{item.nombreEstablecimiento}</td>
                                    <td className="border px-4 py-2">{item.ubicacion}</td>
                                    <td className="border px-4 py-2">{item.direccion}</td>
                                    <td className="border px-4 py-2">{item.telefono}</td>
                                    <td className="border px-4 py-2">{item.tipo}</td>
                                    <td className="border px-4 py-2">{item.niveles}</td>
                                    <td className="border px-4 py-2">{item.jornadas}</td>
                                    <td className="border px-4 py-2">{item.especialidad}</td>
                                    <td className="border px-4 py-2">{item.modelo}</td>
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
                                <td colSpan="3" className="text-center py-4">No hay datos disponibles</td>
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
            {/* <Modal isOpen={isModalOpen} onRequestClose={closeModal} >
                <form>


                    <label >Nombre del colegio:</label>
                    <input
                        type="text"
                        value={newColegio.nombrecolegio}
                        onChange={(e) => setNewColegio({ ...newColegio, nombreInmueble: e.target.value })}
                    />
                    <label >Zona:</label>
                    <input
                        type="text"
                        value={newColegio.tipoInmueble}
                        onChange={(e) => setNewColegio({ ...newColegio, tipoInmueble: e.target.value })}
                    />

                    <label >Dirección:</label>
                    <input

                        type="text"
                        value={newColegio.ciudad}
                        onChange={(e) => setNewColegio({ ...newColegio, ciudad: e.target.value })}
                    />
                    <label >Telefono:</label>
                    <input

                        type="text"
                        value={newColegio.departamento}
                        onChange={(e) => setNewColegio({ ...newColegio, departamento: e.target.value })}
                    />

                    <label >Tipo de Establecimiento:</label>
                    <input

                        type="text"
                        value={newColegio.direccion}
                        onChange={(e) => setNewColegio({ ...newColegio, direccion: e.target.value })}
                    />

                    <label >Niveles:</label>
                    <input

                        type="number"
                        value={newColegio.estrato}
                        onChange={(e) => setNewColegio({ ...newColegio, estrato: parseInt(e.target.value) })}
                    />

                    <label >Jornadas:</label>
                    <input

                        type="number"
                        value={newColegio.valorArriendo}
                        onChange={(e) => setNewColegio({ ...newColegio, valorArriendo: parseFloat(e.target.value) })}
                    />

                    <label >Especialidad:</label>
                    <input

                        type="number"
                        value={newColegio.areaTerreno}
                        onChange={(e) => setNewColegio({ ...newColegio, areaTerreno: parseFloat(e.target.value) })}
                    />

                    <label >Modelo Educativo:</label>
                    <input

                        type="number"
                        value={newColegio.areaConstruida}
                        onChange={(e) => setNewColegio({ ...newColegio, areaConstruida: parseFloat(e.target.value) })}
                    />

                    <label >Capacidades Excepcionales:</label>
                    <input

                        type="checkbox"
                        checked={newColegio.iva}
                        onChange={(e) => setNewColegio({ ...newColegio, iva: e.target.checked })}
                    />

                    <label >Discapacidades:</label>
                    <input

                        type="text"
                        value={newColegio.nombreContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, nombreContacto: e.target.value })}
                    />

                    <label >Idiomas:</label>
                    <input

                        type="text"
                        value={newColegio.celularContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, celularContacto: e.target.value })}
                    />

                    <label >Prestador del Servicio:</label>
                    <input

                        type="text"
                        value={newColegio.telefonoContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, telefonoContacto: e.target.value })}
                    />

                    <label >Calendario:</label>
                    <input

                        type="text"
                        value={newColegio.direccionContacto}
                        onChange={(e) => setNewColegio({ ...newColegio, direccionContacto: e.target.value })}
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

