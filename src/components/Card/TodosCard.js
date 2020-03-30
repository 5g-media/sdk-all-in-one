import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';



const TodosCard = ({  title, subtitle,  ...restProps }) => {
  return (
    <Card {...restProps}>
      <div className="position-relative">
        <CardImg 
		/>
        <CardImgOverlay className="bg-dark" style={{ opacity: 0.2 }}>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardText className="text-white">{subtitle}</CardText>
        </CardImgOverlay>
      </div>
    </Card>
  );
};

TodosCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

TodosCard.defaultProps = {
  title: 'Tasks',
  subtitle: 'Due soon...',
};

export default TodosCard;
