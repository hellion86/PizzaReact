import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { setSearch } from '../../redux/slices/filterSlice.js';

const Search = () => {
  const [localSearchValue, setLocalSearchValue] = React.useState('');
  const dispatch = useDispatch();
  const input = React.useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearch = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 1000),
    []
  );

  const clearSearch = () => {
    dispatch(setSearch(''));
    setLocalSearchValue('');
    // if (input.current) {
    //   input.current.focus();
    // }
    //  optional chaining "?" оператор опциональной последовательности
    input.current?.focus();
  };

  const onChangeInput = (e: any) => {
    setLocalSearchValue(e.target.value);
    updateSearch(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={localSearchValue}
        ref={input}
      />
      {localSearchValue && (
        <svg
          onClick={() => clearSearch()}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.clearIcon}
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
