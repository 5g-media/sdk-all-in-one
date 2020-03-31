import React from 'react';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import {
  adminProductsData,
  developerProductsData,
} from 'constants/dashboardItems';

import LeanOWTutorial from './tutorials/LeanOWTutorial';
import OsmTutorial from './tutorials/OsmTutorial';
import CatalogueTutorial from './tutorials/CatalogueTutorial';
import CnoTrainingTutorial from './tutorials/CnoTrainingTutorial';
import PulicCatalogueTutorial from './tutorials/PulicCatalogueTutorial';
import EditorTutorial from './tutorials/EditorTutorial';
import GeneralInfo from './tutorials/GeneralInfo';
import ValidatorTutorial from './tutorials/ValidatorTutorial';
import MonitoringTutorial from './tutorials/MonitoringTutorial';
import PackagingTutorial from './tutorials/PackagingTutorial';
import AdvisorTutorial from './tutorials/AdvisorTutorial';

export default class TutorialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentWillMount() {
    const urlKey = window.location.href;
    const selectedArray = urlKey.split('/');
    const selectedTutorial = parseInt(
      selectedArray[selectedArray.length - 1],
      10,
    );
    if (selectedTutorial !== this.state.activeTab) {
      if (selectedTutorial === 7 || selectedTutorial === 8) {
        // eslint-disable-next-line
        document.querySelector('.cr-sidebar')
          ? document
              .querySelector('.cr-sidebar')
              .classList.replace('cr-sidebar--open', '.cr-sidebar')
          : '';
      } else {
        // eslint-disable-next-line
        document.querySelector('.cr-sidebar')
          ? document
              .querySelector('.cr-sidebar')
              .classList.replace('.cr-sidebar', 'cr-sidebar--open')
          : '';
      }
      this.setState({
        activeTab: selectedTutorial,
      });
    }
  }

  toggle = tab => {
    if (tab === 7 || tab === 8) {
      // eslint-disable-next-line
      document.querySelector('.cr-sidebar')
        ? document
            .querySelector('.cr-sidebar')
            .classList.replace('cr-sidebar--open', '.cr-sidebar')
        : '';
    } else {
      // eslint-disable-next-line
      document.querySelector('.cr-sidebar')
        ? document
            .querySelector('.cr-sidebar')
            .classList.replace('.cr-sidebar', 'cr-sidebar--open')
        : '';
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  renderSwitch = () => {
    switch (this.state.activeTab) {
      case 0:
        return <GeneralInfo />;
      case 1:
        return <ValidatorTutorial />;
      case 2:
        return <CatalogueTutorial />;
      case 3:
        return <PulicCatalogueTutorial />;
      case 4:
        return <EditorTutorial />;
      case 5:
        return <MonitoringTutorial />;
      case 6:
        return <CnoTrainingTutorial />;
      case 7:
        return <AdvisorTutorial />;
      case 8:
        return <LeanOWTutorial />;
      case 9:
        return <OsmTutorial />;
      case 10:
        return <PackagingTutorial />;
      default:
        return <GeneralInfo />;
    }
  };

  render() {
    return (
      <div>
        <div>
          <Nav tabs className="row align-items-center justify-content-center">
            {(localStorage.getItem('isAdmin') === 'true'
              ? adminProductsData
              : developerProductsData
            ).map(({ id, title }) => (
              <NavItem
                key={id}
                className="text-center col"
                style={{
                  backgroundColor: '#5d67c2',
                  color: '#f8f9fa',
                  height: '6vh',
                }}
              >
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === id,
                  })}
                  style={{ height: '6vh' }}
                  onClick={() => {
                    this.toggle(id);
                  }}
                >
                  {title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId={this.state.activeTab}>
              <Row>
                <Col sm="12">{this.renderSwitch()}</Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
