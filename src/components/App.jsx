// import React from 'react';
import { useEffect, useState } from 'react';
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
    console.log(inputForSearch.value);
    if (searchValue === '') {
      return;
    }
    setImages([]);
    setCurrentSearch(inputForSearch.value);
    setPageNr(1);
  };

  const handleClickMore = () => {
    setPageNr(pageNr + 1);
  };

  useEffect(() => {
    if (currentSearch.trim() === '') {
      return;
    }
    if (pageNr||currentSearch) {
      fetchImages(currentSearch, pageNr)
        .then(response => {
          console.log(response.length);
          setIsLoading(true);
          
          if (response.length === 0) {
            alert('No images on request');
            setIsLoading(false);
            return;
          }

          setImages([...response]);
          setIsLoading(false);
        })
        .finally(() => {
          if (pageNr > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        });
    }
  }, [currentSearch, pageNr]);

  // // отклонено
  // const handleSubmit = evt => {
  //   evt.preventDefault();
  //   const inputForSearch = evt.target.elements.inputForSearch;
  //   const searchValue = inputForSearch.value.trim();
  //   // console.log(inputForSearch.value);
  //   if (searchValue === '') {
  //     return;
  //   }

  //   setImages([]);
  //   setIsLoading(true);
  //   setCurrentSearch(searchValue);
  //   setPageNr(1);

  //   fetchImages(searchValue, 1).then(resp => {

  //     if (resp.length === 0) {
  //       alert('No images on request');
  //       setIsLoading(false);
  //       return
  //     };

  //     setImages(resp);
  //     setIsLoading(false);
  //     setPageNr(2);
  //   });
  // };

  // const handleClickMore = () => {

  //   if (pageNr > 1) {
  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   };

  //   setIsLoading(true);
  //   fetchImages(currentSearch, pageNr).then(resp => {
  //     setImages([...images, ...resp]);
  //     setIsLoading(false);
  //     setPageNr(pageNr + 1);
  //   });
  // };

  const handleImageClick = ({ target }) => {
    setModalOpen(true);
    setModalAlt(target.alt);
    setModalImg(target.name);
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

      {!(images.length < PER_PAGE) && images.length > 0 && !isLoading && (
        <Button onClick={handleClickMore} />
      )}

      {isLoading && <Loader />}

      {modalOpen && (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      )}
    </div>
  );
};
