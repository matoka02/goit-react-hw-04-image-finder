import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  <li className={css.ImageGalleryItem} id={image.id} onClick={onClick}>
    <img
      className={css.ImageGalleryItemImage}
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
    />
  </li>;
};

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
};

export default ImageGalleryItem;
