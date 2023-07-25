import { useEffect } from 'react';
import propTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ src, alt, handleClose }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  // // отклонено
  // useEffect(() => {
  //   const handleKeyDown = evt => {
  //     if (evt.code === 'Escape') {
  //       handleClose();
  //     }
  //   };
  //   window.addEventListener('keydown', handleKeyDown);
  // }, [handleClose]);

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
