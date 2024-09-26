import React, { useState, useEffect } from 'react';

const ColegioPagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(() => {
        setInputPage(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setInputPage(value);
    };

    const handleInputBlur = () => {
        const validPage = inputPage >= 1 && inputPage <= totalPages;
        if (validPage) {
            paginate(inputPage);
        } else {
            setInputPage(currentPage);
        }
    };

    const generatePages = () => {
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
            } else if (currentPage >= totalPages - 1) {
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = currentPage - 1; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }
    };

    generatePages();

    return (
        <div className="flex justify-center items-center mt-4 space-x-2">
            <span
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={`px-3 py-1 cursor-pointer rounded ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-100'}`}
            >
                &lt;
            </span>

            {pageNumbers.map(number => (
                <span
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 cursor-pointer rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                >
                    {number}
                </span>
            ))}

            <span
                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                className={`px-3 py-1 cursor-pointer rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-100'}`}
            >
                &gt;
            </span>

            <input
                type="number"
                value={inputPage}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                min="1"
                max={totalPages}
                className="ml-4 w-12 text-center border rounded"
            />
        </div>
    );
};

export default ColegioPagination;
