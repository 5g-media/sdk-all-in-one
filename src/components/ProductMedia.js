import React from 'react';
import PropTypes from 'utils/propTypes';
import blue_arrow from 'assets/img/blue_arrow.png';

import { CardLink, Media } from 'reactstrap';

const ProductMedia = ({ image, title, description, id, ...restProps }) => {
  return (
    <Media {...restProps}>
      <Media left>
        <Media
          object
          src={image}
          className="rounded mr-2 mb-2"
          style={{ width: 52, height: 'auto' }}
        />
      </Media>
      <Media body className="overflow-hidden">
        <Media heading tag="h6" className="text-truncate" >
          {title}
        </Media>
      </Media>
      <Media right>
        <CardLink tag="a" href={`/tutorial/${id}`}>
          <Media
            object
            src={blue_arrow}
            className="rounded mr-2 mb-2"
            style={{ width: 30, height: 'auto' }}
          />
        </CardLink>
      </Media>
    </Media>
  );
};

ProductMedia.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ProductMedia;
