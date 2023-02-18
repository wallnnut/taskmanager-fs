import React from "react";
import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";

const Paginate = ({ itemsCount, onPageChange, pageSize, activePage }) => {
	const pageCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pageCount + 1);
	if (pageCount === 1) return null;

	return (
		<Pagination>
			{pages.map((page) => (
				<Pagination.Item
					key={page + "index"}
					active={page === activePage}
					onClick={() => onPageChange(page)}
				>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	);
};

export default Paginate;
