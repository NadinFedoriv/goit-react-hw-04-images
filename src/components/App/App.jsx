import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader/Loader';
import './App.scss';
import { fetchImages } from 'services';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoreImages, setNoMoreImages] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (page !== 1 || query !== '') {
      setIsLoading(true);

      fetchImages(query, page)
        .then(data => {
          const lastPage = Math.ceil(data.totalHits / 12);

          if (data.totalHits === 0) {
            setNoMoreImages(true);
            return toast.info(`No results found for ${query}`);
          } else {
            setImages(prevImages => [...prevImages, ...data.hits]);
            setNoMoreImages(false);
          }
          if (page === lastPage) {
            setNoMoreImages(true);
            return toast.success(
              `You have uploaded all images for request ${query}`
            );
          }
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          toast.error(`No results found for ${query}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = clickedImageURL => {
    setLargeImageURL(clickedImageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} handleImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !noMoreImages && (
        <Button onClick={onLoadMore} isVisible={true} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={handleCloseModal} />
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
