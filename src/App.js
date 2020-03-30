import React from 'react';
import { STATE_LOGIN } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';

import AuthPage from 'pages/AuthPage';
import DashboardPage from 'pages/DashboardPage';
import MonitorPage from 'pages/MonitorPage';
import ProfilerPage from 'pages/Profiling';
import PackagingPage from 'pages/packaging';
import OsmcliPage from 'pages/OsmcliPage';
import CatalogPage from 'pages/CatalogPage';
import CatalogPubPage from 'pages/CatalogPubPage';
import Validator from 'pages/Validator';
import EditorPage from 'pages/EditorPage';
import LeanOWPage from 'pages/LeanOWPage';
import TutorialPage from 'pages/TutorialPage';
import ConfigPage from 'pages/ConfigPage';
import TrainingPage from 'pages/TrainingPage';
import LoggingPage from 'pages/Logging';
import componentQueries from 'react-component-queries';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './styles/reduction.css';

const App = () => (
  <Router>
    <Switch>
      <LayoutRoute path="/config" layout={EmptyLayout} component={ConfigPage} />
      <LayoutRoute path="/editor" layout={MainLayout} component={EditorPage} />
      <LayoutRoute
        path="/catalog"
        layout={MainLayout}
        component={CatalogPage}
      />
      <LayoutRoute
        path="/catalogpub"
        layout={MainLayout}
        component={CatalogPubPage}
      />
      <LayoutRoute
        path="/monitor"
        layout={MainLayout}
        component={MonitorPage}
      />
      <LayoutRoute
        path="/profiler"
        layout={MainLayout}
        component={ProfilerPage}
      />
      <LayoutRoute
        path="/validator"
        layout={MainLayout}
        component={Validator}
      />
      <LayoutRoute
        path="/leanOWCLI"
        layout={MainLayout}
        component={LeanOWPage}
      />
      <LayoutRoute path="/osmCLI" layout={MainLayout} component={OsmcliPage} />
      <LayoutRoute
        path="/tutorial"
        layout={MainLayout}
        component={TutorialPage}
      />
      <LayoutRoute
        path="/dashboard"
        layout={MainLayout}
        component={DashboardPage}
      />
      <LayoutRoute
        path="/packaging"
        layout={MainLayout}
        component={PackagingPage}
      />
      <LayoutRoute
        path="/training"
        layout={MainLayout}
        component={TrainingPage}
      />
      <LayoutRoute
        path="/advisor"
        layout={MainLayout}
        component={LoggingPage}
      />
      <LayoutRoute
        exact
        path="/"
        layout={EmptyLayout}
        component={props => <AuthPage {...props} authState={STATE_LOGIN} />}
      />
    </Switch>
  </Router>
);

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (width > 576 && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (width > 768 && width < 991) {
    return { breakpoint: 'md' };
  }

  if (width > 992 && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
