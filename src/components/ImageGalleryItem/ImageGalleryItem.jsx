import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li onClick={() => onClick(src, alt) } className='item' >
      <img className='item-image' src={src} alt={alt}  />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
