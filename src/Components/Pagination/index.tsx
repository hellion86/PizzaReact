import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProp = {
  currentPage: number;
  onChangePage: any;
};

const Pagination: React.FC<PaginationProp> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
