import React, { useState } from "react";

const SearchFilterAdmin = ({ onSearch }) => {

    const [filters, setFilters] = useState({
        nombreEstablecimiento: "",
        niveles: "",
        jornadas: "",
        especialidad: "",
        idiomas: "",
        calendario: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    return (
        <div className="mb-4 p-4 border bg-white rounded shadow">
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Buscar colegio..."
                    value={filters.nombreEstablecimiento}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />

                <select
                    value={filters.niveles}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                    placeholder="Niveles">
                    <option value="">Niveles</option>
                    <option value="PREESCOLAR">Preescolar</option>
                    <option value="MEDIA">Media</option>
                    <option value="BÁSICA PRIMARIA">Básica Primaria</option>
                    <option value="BÁSICA SECUNDARIA">Básica Secundaria</option>
                </select>
                <select
                    value={filters.jornadas}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                    placeholder="Jornada">
                    <option value="">Jornada</option>
                    <option value="MAÑANA">Mañana</option>
                    <option value="TARDE">Tarde</option>
                    <option value="NOCTURNA">Nocturna</option>
                    <option value="COMPLETA">Completa</option>
                </select>
                <select
                    value={filters.especialidad}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4">
                    <option value="">Especialidad</option>
                    <option value="ACADÉMICA">Académico</option>
                    <option value="INDUSTRIAL">Industrial</option>
                    <option value="COMERCIAL">Comercial</option>
                    <option value="OTRO">Otro</option>
                </select>
                <select
                    value={filters.idiomas}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4">
                    <option value="">Idiomas</option>
                    <option value="HEBREO">Hebreo</option>
                    <option value="INGLÉS">Inglés</option>
                    <option value="FRANCÉS">Francés</option>
                    <option value="ALEMÁN">Alemán</option>
                    <option value="ITALIANO">Italiano</option>
                </select>
                <select
                    value={filters.calendario}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded w-full md:w-1/4"
                >
                    <option value="">Calendario</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default SearchFilterAdmin