import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className={css.ImageGalleryItem} id={image.id} onClick={onImageClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  // image: propTypes.objectOf(propTypes.number).isRequired,  
  image: propTypes.object.isRequired,
  onImageClick: propTypes.func.isRequired,
};