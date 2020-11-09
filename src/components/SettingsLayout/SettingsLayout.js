import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import cx from 'classnames';

import {
  container,
  layoutCard,
  asideLinks,
  activeAsideLink
} from './SettingsLayout.module.sass';
import BackArrow from '../../vectors/BackArrow';

const SettingsLayout = ({
  title,
  cardClassName,
  cardRender,
  routes,
  asideBottomRender
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={container}>
      <header>
        <Link to="/dashboard">
          <BackArrow />
        </Link>
        <h4>{title}</h4>
      </header>
      <aside>
        <div className={cx(layoutCard, cardClassName)}>{cardRender}</div>
        <ul className={asideLinks}>
          {routes.map(({ path, label, icon }, index) => (
            <li key={index}>
              <NavLink to={path} activeClassName={activeAsideLink}>
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {asideBottomRender && <div>{asideBottomRender}</div>}
      </aside>
      <section>
        <Switch>
          {routes.map(({ component, path }, index) => (
            <Route key={index} path={path} component={component} />
          ))}
          <Redirect to={routes[0].path} />
        </Switch>
      </section>
    </main>
  );
};

SettingsLayout.propTypes = {
  title: PropTypes.string.isRequired,
  cardClassName: PropTypes.string.isRequired,
  cardRender: PropTypes.node.isRequired,
  routes: PropTypes.array.isRequired,
  asideBottomRender: PropTypes.node
};

export default SettingsLayout;
