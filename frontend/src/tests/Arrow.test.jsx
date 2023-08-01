import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Arrow from '../components/Arrow';

describe('Arrow component', () => {
  it('renders correctly', () => {
    const { container } = render(<Arrow degree={45} />);
    expect(container).toBeInTheDocument();
  });

  it('applies correct rotation style', () => {
    const { container } = render(<Arrow degree={45} />);
    const svgElement = container.firstChild;
    expect(svgElement).toHaveStyle('transform: rotate(45deg)');
  });

  it('renders the arrow with correct stroke properties', () => {
    const { container } = render(<Arrow degree={45} />);
    const polylineElements = container.querySelectorAll('polyline');
    polylineElements.forEach((polyline) => {
      expect(polyline).toHaveAttribute('stroke', 'black');
      expect(polyline).toHaveAttribute('stroke-width', '2');
      expect(polyline).toHaveAttribute('fill', 'none');
    });
  });
});
