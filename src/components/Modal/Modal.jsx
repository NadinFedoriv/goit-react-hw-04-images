import { useEffect } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

export const Modal = ({largeImageURL, onClose}) => {
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

     
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

   const handleOverlayClick = (event) => {
     if (event.target === event.currentTarget) {
       onClose();
     }
   };
 

    return (
      <div className='overlay' onClick={handleOverlayClick}>
        <div className='modal'>
          <img src={largeImageURL} alt='' />
        </div>
      </div>
    );
  
}


Modal.propTypes = {
  largeImageURL: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};