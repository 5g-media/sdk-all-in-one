import React from 'react';
import bn from 'utils/bemnames';
import { Navbar, Nav, NavItem, NavLink as BSNavLink } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdBuild,
  MdBackup,
  MdCallToAction,
  MdFindInPage,
  MdExitToApp,
  MdChromeReaderMode,
  MdScreenShare,
  MdMoveToInbox,
  MdLaptopChromebook,
} from 'react-icons/lib/md';
import SourceLink from 'components/SourceLink';

import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logo200Image from 'assets/img/logo/5g_media.png';
import { getConfig } from 'utils/configUtils';

import { editor, catalogue } from 'constants/clientConfig';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
const navItemsAdmin = [
  { to: '/dashboard', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/editor', name: 'editor', exact: true, Icon: MdChromeReaderMode },
  { to: '/catalogpub', name: 'Public Catalogue', exact: true, Icon: MdBackup },
  {
    to: '/monitor',
    name: 'Service Monitoring',
    exact: true,
    Icon: MdScreenShare,
  },
  { to: '/', name: 'logout', exact: true, Icon: MdExitToApp },
];
const navItemsDeveloper = [
  { to: '/dashboard', name: 'tutorials', exact: true, Icon: MdDashboard },
  { to: '/validator', name: 'validator', exact: true, Icon: MdBuild },
  { to: '/catalog', name: 'Private catalogue', exact: true, Icon: MdBackup },
  { to: '/editor', name: 'editor', exact: true, Icon: MdChromeReaderMode },
  {
    to: '/monitor',
    name: 'Service Monitoring',
    exact: true,
    Icon: MdScreenShare,
  },
  {
    to: '/profiler',
    name: 'Benchmarking',
    exact: true,
    Icon: MdFindInPage,
  },
  { to: '/advisor', name: 'SVP Runtime Advisor', exact: true, Icon: MdBuild },
  {
    to: '/leanOWCLI',
    name: 'Lean OW Web CLI',
    exact: true,
    Icon: MdCallToAction,
  },
  { to: '/osmCLI', name: 'OSM Web cli', exact: true, Icon: MdLaptopChromebook },
  { to: '/packaging', name: 'Packaging', exact: true, Icon: MdMoveToInbox },
  { to: '/training', name: 'CNO Training', exact: true, Icon: MdMoveToInbox },
  { to: '/', name: 'logout', exact: true, Icon: MdExitToApp },
];

const bem = bn.create('sidebar');

export default class Sidebar extends React.Component {
  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg =
      localStorage.getItem('isAdmin') === 'true'
        ? config.admin
        : config.developer;

    const editorUrl =
      configg !== undefined
        ? editor({
            editorUrl: configg.editor.editor_url || '',
            editorPort: configg.editor.editor_port || '',
          }).editorUrl
        : '';

    const catalogueUrl =
      configg !== undefined
        ? catalogue({
            privateCatalogueIP: configg.catalogue.catalogue_IP || '',
            privateCataloguePort: configg.catalogue.catalogue_port || '',
          }).catalogueUrl
        : '';
    this.setState({ editorUrl, catalogueUrl });
  }

  openInNewTab = page => {
    if (page === '/catalog') {
      window.open(this.state.catalogueUrl, '_blank');
    } else if (page === '/catalogpub') {
      window.open(this.state.catalogueUrl, '_blank');
    } else if (page === '/editor') {
      window.open(this.state.editorUrl, '_blank');
    }
  };

  renderSidebar = () => {
    const items =
      localStorage.getItem('isAdmin') === 'true'
        ? navItemsAdmin
        : navItemsDeveloper;

    const navItems = [];
    // eslint-disable-next-line array-callback-return
    items.map(({ to, name, exact, Icon }, index) => {
      if (to === '/catalog' || to === '/editor' || to === '/catalogpub') {
        navItems.push(
          <NavItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={bem.e('nav-item')}
            onClick={() => this.openInNewTab(to)}
          >
            <BSNavLink
              id={`navItem-${name}-${index}`}
              className="text-uppercase"
              tag={NavLink}
              to={to}
              activeClassName="active"
              exact={exact}
            >
              <Icon className={bem.e('nav-item-icon')} />
              <span className="">{name}</span>
            </BSNavLink>
          </NavItem>,
        );
      } else {
        navItems.push(
          // eslint-disable-next-line react/no-array-index-key
          <NavItem key={index} className={bem.e('nav-item')}>
            <BSNavLink
              id={`navItem-${name}-${index}`}
              className="text-uppercase"
              tag={NavLink}
              to={to}
              activeClassName="active"
              exact={exact}
            >
              <Icon className={bem.e('nav-item-icon')} />
              <span className="">{name}</span>
            </BSNavLink>
          </NavItem>,
        );
      }
    });
    return navItems;
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="120"
                height="25"
                className="pr-2"
                alt=""
              />
              {localStorage.getItem('isAdmin') === 'true' ? (
                <span />
              ) : (
                <span className="text-white">SDK</span>
              )}
            </SourceLink>
          </Navbar>
          <Nav vertical>{this.renderSidebar()}</Nav>
        </div>
      </aside>
    );
  }
}
