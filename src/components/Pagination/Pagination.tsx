// This component is used to set limit of data shown in one page 


import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    return (
        <BootstrapPagination>
            <BootstrapPagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <BootstrapPagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
                <BootstrapPagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </BootstrapPagination.Item>
            ))}
            <BootstrapPagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <BootstrapPagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </BootstrapPagination>
    );
};

export default Pagination;
