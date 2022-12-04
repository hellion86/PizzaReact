import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSort } from '../redux/slices/filterSlice';

type SortItem = {
  title: string;
  property: string;
  order: string;
};

export const sortOptions: SortItem[] = [
  { title: 'популярности (DESC)', property: 'rating', order: 'desc' },
  { title: 'популярности (ASC)', property: 'rating', order: 'asc' },
  { title: 'цене (DESC)', property: 'price', order: 'desc' },
  { title: 'цене (ASC)', property: 'price', order: 'asc' },
  { title: 'алфавиту (DESC)', property: 'title', order: 'desc' },
  { title: 'алфавиту (ASC)', property: 'title', order: 'asc' },
];
const Sort = () => {
  const [isOpen, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const value = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement | null>(null);

  const selectMenu = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const closeSortMenu = (e: any) => {
      if (!e.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', (e) => closeSortMenu(e));
    // remove listener after unmount component
    return () => {
      document.body.removeEventListener('click', (e) => closeSortMenu(e));
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!isOpen)}>{value.title}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((obj) => (
              <li
                key={obj.title}
                onClick={() => selectMenu(obj)}
                className={value.title === obj.title ? 'active' : ''}
              >
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
