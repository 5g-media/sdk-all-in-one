import React, { Component } from 'react';

import classnames from 'classnames';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import PackCreate from 'pages/packaging/tabs/PackCreate';
import PackBuild from 'pages/packaging/tabs/PackBuild';
import PackTest from 'pages/packaging/tabs/PackTest';
import PackPush from 'pages/packaging/tabs/PackPush';
import { packagingTabs } from 'constants/packaging';

class PackagingPage extends Component {
  componentWillMount() {
    this.setState({
      activeTab: 0,
    });
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  renderTabs = () => {
    switch (this.state.activeTab) {
      case 0:
        return <PackCreate />;
      case 1:
        return <PackBuild />;
      case 2:
        return <PackTest />;
      case 3:
        return <PackPush />;
      default:
        return <PackCreate />;
    }
  };

  render() {
    return (
      <div>
        <div>
          <Nav tabs>
            {packagingTabs.map(({ id, title }) => (
              <NavItem
                key={id}
                className="text-center"
                style={{ backgroundColor: '#5d67c2', userSelect: 'none' }}
              >
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === id,
                  })}
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
              <Container style={{ marginTop: '2vh' }}>{this.renderTabs()}</Container>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default PackagingPage;
