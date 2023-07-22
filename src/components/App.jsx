// import React from 'react';
import { useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages, PER_PAGE } from '../services/fetchImages';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const inputForSearch = evt.target.elements.inputForSearch;
    const searchValue = inputForSearch.value.trim();
    // console.log(inputForSearch.value);
    if (searchValue === '') {
      return;
    }

    setImages([]);
    setIsLoading(true);
    setCurrentSearch(searchValue);
    setPageNr(1);

    fetchImages(searchValue, 1).then(resp => {
      setImages(resp);
      setIsLoading(false);
      setPageNr(2);
    });
  };

  const handleClickMore = () => {
    setIsLoading(true);
    fetchImages(currentSearch, pageNr).then(resp => {
      setImages([...images, ...resp]);
      setIsLoading(false);
      setPageNr(pageNr + 1);
    });
  };

  const handleImageClick = evt => {
    setModalOpen(true);
    setModalAlt(evt.target.alt);
    setModalImg(evt.target.name);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        justifyContent: 'center',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery onImageClick={handleImageClick} images={images} />
      )}

      {(!(images.length < PER_PAGE)&&(images.length > 0)&&(!isLoading))&& <Button onClick={handleClickMore} />}

      {isLoading && <Loader />}

      {modalOpen && (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      )}
    </div>
  );
};
