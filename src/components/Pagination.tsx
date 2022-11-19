import React, { ReactElement } from 'react';
import usePagination, { DOTS } from '../utils/usePagination';

interface Props {
    onPageChange(page: number | string): void;
    totalCount: number
    siblingCount?: number,
    currentPage: number,
    pageSize: number
}

export default function Pagination(props: Props): ReactElement {

  const paginationRange = usePagination({
    currentPage: props.currentPage,
    totalCount: props.totalCount,
    siblingCount: props.siblingCount ?? 1,
    pageSize: props.pageSize
  });

  if (!paginationRange) return <></>;

  if (props.currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul>
      <li
        className={'pagination-item'} 
        // disabled-aria={props.currentPage === 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber: string | number) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
            <button 
                className={`pagination-item ${pageNumber === props.currentPage ? 'text-3xl text-orange-400' : null}`} 
                onClick={() => props.onPageChange(pageNumber)}
            >
                {pageNumber}
            </button>
        );
      })}
      <button
        disabled={props.currentPage === lastPage}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        <div className="arrow right" />
      </button>
    </ul>
  );
};

