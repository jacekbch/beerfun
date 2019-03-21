import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { MdClose } from 'react-icons/md';
import BeerDetails from './BeerDetails';
import './BeerDetailsModal.scss';

class BeerDetailsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onClosed = this.onClosed.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.showModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id === prevProps.match.params.id) return;
    if (this.props.match.params.id) {
      this.showModal();
    } else {
      this.hideModal();
    }
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  showModal() {
    this.setState({ modalIsOpen: true });
  }

  hideModal() {
    this.setState({ modalIsOpen: false });
  }

  onClosed() {
    this.props.history.push('/');
  }

  renderBeerDetails() {
    if (!this.props.match.params.id) return null;
    return <BeerDetails id={this.props.match.params.id}></BeerDetails>;
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        toggle={this.toggleModal}
        onClosed={this.onClosed}
        size="lg"
        scrollable="true"
      >
        <ModalBody>
          { this.renderBeerDetails() }
        </ModalBody>
        <div className="close-button" onClick={this.toggleModal}><MdClose /></div>
      </Modal>
    );
  }
}

export default BeerDetailsModal;
