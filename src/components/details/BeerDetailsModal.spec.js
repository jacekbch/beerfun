import React from 'react';
import { shallow } from 'enzyme';
import BeerDetailsModal from './BeerDetailsModal';

const defaultProps = {
  match: { params: {} },
};

describe('BeerDetailsModal Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <BeerDetailsModal {...defaultProps} />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('does not show modal by default', () => {
    expect(component.state().modalIsOpen).toBe(false);
  });

  it('shows modal if there is id in params', () => {
    component.setProps({ match: { params: { id: 1 } } });
    expect(component.state().modalIsOpen).toBe(true);
  });

  describe('controlling modal', () => {
    it('toggleModal', () => {
      component.setState({ modalIsOpen: false });
      component.instance().toggleModal();
      expect(component.state().modalIsOpen).toBe(true);
    });

    it('showModal', () => {
      component.setState({ modalIsOpen: false });
      component.instance().showModal();
      expect(component.state().modalIsOpen).toBe(true);
    });

    it('hideModal', () => {
      component.setState({ modalIsOpen: true });
      component.instance().hideModal();
      expect(component.state().modalIsOpen).toBe(false);
    });
  });
});
