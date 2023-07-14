import React, {Component} from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import {Modal} from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from '../services/fetchImages';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  // handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   this.setState({ isLoading: true });
  //   const inputForSearch = evt.target.elements.inputForSearch;
  //   if (inputForSearch.value.trim() === '') {
  //     return;
  //   }
  //   const response = fetchImages(inputForSearch.value, 1);
  //   this.setState({
  //     images: response,
  //     isLoading: false,
  //     currentSearch: inputForSearch.value,
  //     pageNr: 1, 
  //   });
  // };

  // handleClickMore = async () => {
  //   const response = await fetchImages(
  //     this.state.currentSearch,
  //     this.state.pageNr + 1
  //   );
  //   this.setState({
  //     images: [...this.state.images, ...response],
  //     pageNr: this.state.pageNr + 1,
  //   });
  // };

  componentDidUpdate(_, prevState) {
    // console.log(prevProps);     // пустой массив
    console.log(prevState);     // массив, предыдущее состояние FormToDo
    console.log(this.state);    // массив, текущее состояние state

    this.setState({ isLoading: true });
    const prevStateText = prevState.currentSearch;
    const nextStayText = this.state.currentSearch;

    if (nextStayText !== prevStateText) {
      const response = fetchImages(nextStayText, 1);

      this.setState({
        images: response,
        isLoading: false,
        currentSearch: nextStayText,
        pageNr: 1, 
      });
    }

  }

  handleImageClick = (evt) => {
    this.setState({
      modalOpen: true,
      modalAlt: evt.target.alt,
      modalImg: evt.target.name,
    });

  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleClickMore = () => {
    this.setState((prevState) => ({
      pageNr: prevState.pageNr + 1
    }))
  }

  onFormSubmit = (searchName) => {
    console.log(searchName);
    this.setState({ 
      images: {},
      isLoading: false,
      currentSearch: searchName,
      pageNr: 1, 
    });
  };

  render() {
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
        {/* <Searchbar onSubmit={this.handleSubmit} /> */}
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.images ? (
          <ImageGallery
          onImageClick={this.handleImageClick}
          images={this.state.images}
        />) : null}

        {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
        {this.state.isLoading && (
          <Loader />
        )}
        {/* {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
        )} */}
        {this.state.modalOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}