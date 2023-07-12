import propTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => (
  <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.SearchFormButton}>
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
  onSubmit: propTypes.func,
};


// import propTypes from 'prop-types';
// import css from './Searchbar.module.css';

// const Searchbar = ({ onSubmit }) => {
//   <header className={css.Searchbar}>
//     <form className={css.SearchForm} onSubmit={onSubmit}>
//       <button className={css.SearchFormButton} type="submit">
//         <span className={css.SearchFormButtonLabel}>Search</span>
//       </button>
//       <input
//         className={css.SearchFormInput}
//         type="text"
//         name="inputForSearch"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//       />
//     </form>
//   </header>;
// };

// Searchbar.propTypes = {
//   onSubmit: propTypes.func,
// };

// export default Searchbar;
