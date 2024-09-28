import React, { useState, useEffect } from "react";
import axios from "axios";


const SearchFilterAdmin = ({ onSearch }) => {

    const [filters, setFilters] = useState({
        nombreEstablecimiento: "",
        niveles: "",
        jornadas: "",
        especialidad: "",
        idiomas: "",
        calendario: "",
        modeloseducativos: "",
        discapacidades: "",
        prestador: ""
    });

    const [colegio, setColegio] = useState([]);
    const [filteredColegios, setFilteredColegios] = useState([]);
    const [nivelesOptions, setNivelesOptions] = useState([]); // Estado para guardar los niveles
    const [jornadasOptions, setJornadasOptions] = useState([]); // Estado para las jornadas
    const [especialidadOptions, setEspecialidadOptions] = useState([]); // Estado para las especialidades
    const [idiomasOptions, setIdiomasOptions] = useState([]); // Estado para los idiomas
    const [calendarioOptions, setCalendarioOptions] = useState([]); // Estado para los calendarios
    const [modeloseducativosOptions, setModeloseducativosOptions] = useState([]); // Corregido
    const [discapacidadesOptions, setDiscapacidadesOptions] = useState([]);
    const [prestadorOptions, setPrestadorOptions] = useState([]);


    // Obtener los niveles
    useEffect(() => {
        const fetchNiveles = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-niveles');
                const niveles = response.data
                    .filter((item) => item !== null) // Filtra los valores nulos
                    .flatMap((item) => item.split(',')); // Divide los valores por comas en un array
                const uniqueNiveles = Array.from(new Set(niveles));
                setNivelesOptions(uniqueNiveles); // Guardamos las opciones procesadas

            } catch (error) {
                console.error("Error al obtener los niveles:", error);
            }
        };

        fetchNiveles();
    }, []); // Se ejecuta una vez cuando el componente se monta
    // Obtener las jornadas
    useEffect(() => {
        const fetchJornadas = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-jornadas');
                const jornadas = response.data
                    .filter((item) => item !== null) // Filtrar los valores nulos
                    .flatMap((item) => item.split(',')); // Dividir por comas
                const uniqueJornadas = Array.from(new Set(jornadas));
                setJornadasOptions(uniqueJornadas); // Guardar las jornadas
            } catch (error) {
                console.error("Error al obtener las jornadas:", error);
            }
        };

        fetchJornadas();
    }, []); // Se ejecuta al montar el componente
    // Obtener las especialidades
    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-especialidad');
                const especialidades = response.data
                    .filter((item) => item !== null) // Filtrar los valores nulos
                    .flatMap((item) => item.split(',')); // Dividir por comas
                const uniqueEspecialidades = Array.from(new Set(especialidades));
                setEspecialidadOptions(uniqueEspecialidades); // Guardar las jornadas
            } catch (error) {
                console.error("Error al obtener las especialidades:", error);
            }
        };

        fetchEspecialidades();
    }, []); // Se ejecuta al montar el componente
    // Obtener los idiomas
    useEffect(() => {
        const fetchIdiomas = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-idiomas');
                const idiomas = response.data
                    .filter((item) => item !== null) // Filtrar valores nulos
                    .flatMap((item) => item.split(',')); // Dividir por comas

                const uniqueIdiomas = Array.from(new Set(idiomas)); // Eliminar duplicados
                setIdiomasOptions(uniqueIdiomas); // Guardar los idiomas únicos
            } catch (error) {
                console.error("Error al obtener los idiomas:", error);
            }
        };

        fetchIdiomas();
    }, []); // Ejecutar cuando el componente se monte
    // Obtener los calendarios
    useEffect(() => {
        const fetchCalendario = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-calendario'); // Reemplaza con el endpoint correcto
                const calendarios = response.data
                    .filter((item) => item !== null)
                    .flatMap((item) => item.split(',')); // Si están separados por comas

                const uniqueCalendarios = Array.from(new Set(calendarios));
                setCalendarioOptions(uniqueCalendarios);
            } catch (error) {
                console.error("Error al obtener los calendarios:", error);
            }
        };
        fetchCalendario();
    }, []);
    // Obtener los modelos educativos
    useEffect(() => {
        const fetchModeloseducativos = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-modeloseducativos');
                const modeloseducativos = response.data
                    .filter((item) => item !== null)
                    .flatMap((item) => item.split(','));

                const uniqueModeloseducativos = Array.from(new Set(modeloseducativos));
                setModeloseducativosOptions(uniqueModeloseducativos);
            } catch (error) {
                console.error("Error al obtener los modelos educativos:", error);
            }
        };
        fetchModeloseducativos();
    }, []);
    // Obtener las discapacidades
    useEffect(() => {
        const fetchDiscapacidades = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-discapacidades');
                const discapacidades = response.data
                    .filter((item) => item !== null)
                    .flatMap((item) => item.split(','));

                const uniqueDiscapacidades = Array.from(new Set(discapacidades));
                setDiscapacidadesOptions(uniqueDiscapacidades);
            } catch (error) {
                console.error("Error al obtener las discapacidades:", error);
            }
                
                
        };
        fetchDiscapacidades();
    }, []);
    // Obtener los prestadores
    useEffect(() => {
        const fetchPrestador = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/v1/colegios/find-prestador');
                const prestadores = response.data
                    .filter((item) => item !== null)
                    .flatMap((item) => item.split(','));

                const uniquePrestadores = Array.from(new Set(prestadores));
                setPrestadorOptions(uniquePrestadores);
            } catch (error) {
                console.error("Error al obtener los prestadores:", error);
            }
        };
        fetchPrestador();
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    //Filtrar datos Find-All

    useEffect(() => {
        const { niveles, jornadas, especialidad, modeloseducativos, idiomas, calendario, discapacidades, prestador } = filters;
        // Si no se selecciona un valor, se asigna "nulo" al parámetro
        const nivelesParam = niveles || 'nulo';
        const jornadasParam = jornadas || 'nulo';
        const especialidadParam = especialidad || 'nulo';
        const modeloseducativosParam = modeloseducativos || 'nulo';
        const idiomasParam = idiomas || 'nulo';
        const calendarioParam = calendario || 'nulo';
        const prestadorParam = prestador || 'nulo';
        const discapacidadesParam = discapacidades || 'nulo';
    
        const url = `http://localhost:8081/api/v1/colegios/findFilter/${nivelesParam}/${jornadasParam}/${especialidadParam}/${modeloseducativosParam}/${idiomasParam}/${calendarioParam}/${discapacidadesParam}/${prestadorParam}`;
        console.log(url);
        
        axios.get(url)
            .then(response => {
                const colegioData = Array.isArray(response.data) ? response.data : [];
                setColegio(colegioData);
                setFilteredColegios(colegioData); // Muestra todos los datos
            })
            .catch(error => console.error('Error fetching data: ', error));
    
    }, [filters]);
    
    
    
    
    ; // Añadimos filters como dependencia para que el efecto se ejecute cuando cambien

    const handleFilter = () => {
        const { niveles, jornadas, especialidad, modeloseducativos, idiomas, calendario, prestador, discapacidades } = filters;
        const filteredData = colegio.filter((item) => {
            return (
                item.niveles === niveles ||
                item.jornadas === jornadas ||
                item.especialidad === especialidad ||
                item.modeloseducativos === modeloseducativos ||
                item.idiomas === idiomas ||
                item.discapacidades === discapacidades ||
                item.calendario === calendario ||
                item.prestador === prestador 
            );
        });
        setFilteredColegios(filteredData);
    }


    return (
        <div className="mb-4 p-4 border bg-white rounded shadow">
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Buscar colegio..."
                    name="nombreEstablecimiento" // Asegúrate de incluir el name
                    value={filters.nombreEstablecimiento}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <select
                    name="niveles" // Asegúrate de incluir el name
                    value={filters.niveles}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Niveles</option>
                    {nivelesOptions.map((nivel, index) => (
                        <option key={index} value={nivel}>
                            {nivel}
                        </option>
                    ))}
                </select>
                <select
                    name="jornadas"
                    value={filters.jornadas}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Jornadas</option>
                    {jornadasOptions.map((jornada, index) => (
                        <option key={index} value={jornada}>
                            {jornada}
                        </option>
                    ))}
                </select>

                <select
                    name="especialidades"
                    value={filters.especialidades}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Especialidades</option>
                    {especialidadOptions.map((especialidad, index) => (
                        <option key={index} value={especialidad}>
                            {especialidad}
                        </option>
                    ))}
                </select>
                <select
                    name="idiomas"
                    value={filters.idiomas}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Idiomas</option>
                    {idiomasOptions.map((idioma, index) => (
                        <option key={index} value={idioma}>
                            {idioma}
                        </option>
                    ))}
                </select>
                <select
                    name="calendario"
                    value={filters.calendario}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Calendario</option>
                    {calendarioOptions.map((calendario, index) => (
                        <option key={index} value={calendario}>
                            {calendario}
                        </option>
                    ))}
                </select>
                <select
                    name="modeloseducativos"
                    value={filters.modeloseducativos}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Modelos Educativos</option>
                    {modeloseducativosOptions.map((modeloseducativo, index) => (
                        <option key={index} value={modeloseducativo}>
                            {modeloseducativo}
                        </option>
                    ))}
                </select>
                <select
                    name="discapacidades"
                    value={filters.discapacidades}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Discapacidades</option>
                    {discapacidadesOptions.map((discapacidad, index) => (
                        <option key={index} value={discapacidad}>
                            {discapacidad}
                        </option>
                    ))}
                </select>

                <select
                    name="prestador"
                    value={filters.prestador}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="nulo">Prestador</option>
                    {prestadorOptions.map((prestador, index) => (
                        <option key={index} value={prestador}>
                            {prestador}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Filtrar
                </button>
                
            </div>
        </div>
    );
};



export default SearchFilterAdmin