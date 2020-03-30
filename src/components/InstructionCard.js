import React from 'react';
import { Card, CardTitle, CardText, CardBody, Button } from 'reactstrap';
import { sendCommand } from 'api/service/xtermService';

const InstructionCard = props => {
  const sendFirstCommand = () => {
    sendCommand({
      serviceIp: props.serviceIp,
      processId: props.processId,
      command: props.onCommandClick,
    });
  };

  const sendSecondCommand = () => {
    sendCommand({
      serviceIp: props.serviceIp,
      processId: props.processId,
      command: props.onSecondCommandClick,
    });
  };

  return (
    <Card
      body
      className="text-center"
      style={{ marginLeft: '4vh', marginTop: '2vh' }}
    >
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardText>{props.cardText1}</CardText>
        <CardText>
          <Button outline color="primary" onClick={sendFirstCommand}>
            {props.buttonText}
          </Button>
        </CardText>
        {props.cardText2 ? <CardText>{props.cardText2}</CardText> : ''}
        {props.cardText3 ? <CardText>{props.cardText3}</CardText> : ''}
        {props.buttonText2 ? (
          <CardText>
            <Button outline color="primary" onClick={sendSecondCommand}>
              {props.buttonText2}
            </Button>
          </CardText>
        ) : (
          ''
        )}
      </CardBody>
    </Card>
  );
};

export default InstructionCard;
