import React from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

function CustomPagination({ totalItems, limitPerPage, currentPage, changePage }) {
    const totalPages = Math.ceil(totalItems / limitPerPage);
    //console.log({ totalItems, limitPerPage, currentPage, changePage, totalPages });

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleOnClick = (e, number) => {
        e.preventDefault();
        changePage(number)
    }

    return (
        <Pagination aria-label="Page navigation example ">
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink first href="#" onClick={(e) => handleOnClick(e, 1)} />
            </PaginationItem>
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous href="#" onClick={(e) => handleOnClick(e, currentPage - 1)} />
            </PaginationItem>
            {
                pageNumbers.map(num => (
                    <PaginationItem key={num} className={num === currentPage ? "active" : null}>
                        <PaginationLink href="#" onClick={(e) => handleOnClick(e, num)}>
                            {num}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }

            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next href="#" onClick={(e) => handleOnClick(e, currentPage + 1)} />
            </PaginationItem>
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink last href="#" onClick={(e) => handleOnClick(e, totalPages)} />
            </PaginationItem>
        </Pagination>
    )
}

export default CustomPagination
