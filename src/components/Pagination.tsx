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
		<div className={"mt-5 flex justify-center"}>
			<button
				className={'m-2 border-2 border-amber-500 rounded-md w-10 h-10'} 
				// disabled-aria={props.currentPage === 1}
				onClick={() => props.onPageChange(props.currentPage - 1)}
			>
				<div className="">&#8592;</div>
			</button>
			{paginationRange.map((pageNumber: string | number, index: number) => {
				if (pageNumber === DOTS) {
					return <button key={index} className="m-2 border-2 border-amber-500 rounded-md w-10 h-10">&#8230;</button>;
				}

				return (
					<button 
						key={index}
						className={`${pageNumber === props.currentPage ? 'text-2xl text-orange-400' : null} m-2 border-2 border-amber-500 rounded-md w-10 h-10`} 
						onClick={() => {
							props.onPageChange(pageNumber);
							window.scrollTo(0, 0);
						}}
					>
						{pageNumber}
					</button>
				);
			})}
			<button
				className={'m-2 border-2 border-amber-500 rounded-md w-10 h-10'}
				disabled={props.currentPage === lastPage}
				onClick={() => props.onPageChange(props.currentPage + 1)}
			>
				<div className={""}>&#8594;</div>
			</button>
		</div>
	);
};

