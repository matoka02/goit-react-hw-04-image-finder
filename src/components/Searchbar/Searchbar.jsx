import propTypes from 'prop-types';
import {CiSearch} from 'react-icons/ci'
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => (
  <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.SearchFormButton}>
        <CiSearch />
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        name="inputForSearch"
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;