// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Route, Link, Switch, useLocation, Redirect } from 'react-router-dom';

// Pages
import HomePageNoLogged from './components/Pages/HomePageNoLogged.js';
import HomePageLogged from './components/Pages/HomePage.js';
import NewsPage from './components/Pages/NewsPage.js';
import PopularPage from './components/Pages/PopularPage.js';
import RegisterPage from './components/Pages/RegisterPage.js';
import RegisterTopicPage from './components/Pages/RegisterTopicPage';
import RegisterCommunityPage from './components/Pages/RegisterCommunityPage';
import LoginPage from './components/Pages/LoginPage';
import PostPage from './components/Pages/PostPage';
import FollowCommunityPage from './components/Pages/FollowCommunityPage';
import FollowTopicPage from './components/Pages/FollowTopicPage';
import Page404 from './components/Pages/Page404';
import UserPage from './components/Pages/UserPage';

// Components
import NavBar from './components/NavBar/NavBar.js';
import NavItem from './components/NavBar/NavItem.js';
import Header from './components/header/Header.js';
import SubHeaderHome from './components/header/SubHeaderHome.js';
import SubHeaderBack from './components/header/SubHeaderBack.js';
import ModalSwitch from './components/Modals/ModalSwitch';

// Icons
import IconLogo from './components/icons/IconLogo';
import IconCommunities from './components/icons/IconCommunities.js';
import IconPost from './components/icons/IconPost.js';

// Hooks
import { AuthContext } from './components/providers/AuthProvider.js';

function App() {
  const [datos] = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState();
  const location = useLocation();
  const routesLogin = [
    '/register',
    '/login',
    '/register/topic',
    '/register/community',
  ];
  const routesHome = ['', '/', '/new', '/home', '/popular'];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const useModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={'App purple'}>
      {showModal ? <ModalSwitch onClick={useModal} /> : null}

      <Header />
      {routesHome.includes(currentRoute) ? <SubHeaderHome /> : null}
      {routesHome.includes(currentRoute) ||
      routesLogin.includes(currentRoute) ? null : (
        <SubHeaderBack currentRoute={currentRoute} />
      )}

      <NavBar>
        <NavItem name="logo-ico">
          <Link to="/" className="icon-link">
            <IconLogo className="logo ico small" />
          </Link>
        </NavItem>
        <NavItem name="post-ico">
          {datos !== '' ? (
            <Link to="#" className="icon-link" onClick={useModal}>
              <IconPost className="create-post ico small" />
            </Link>
          ) : (
            <Link to="/register" className="icon-link">
              <IconPost className="create-post ico small" />
            </Link>
          )}
        </NavItem>
        <NavItem name="com-ico">
          <Link to="/c" className="icon-link">
            <IconCommunities className="create-post ico small" />
          </Link>
        </NavItem>
      </NavBar>

      <main className={`${showModal ? 'no-scroll' : ''}`}>
        <Switch>
          <Route exact path="/home">
            <Redirect to={'/'} />
          </Route>
          <Route exact path="/">
            {datos !== '' ? <HomePageLogged /> : <HomePageNoLogged />}
          </Route>
          <Route path="/new">
            <NewsPage />
          </Route>
          <Route path="/popular">
            <PopularPage />
          </Route>
          <Route exact path="/register">
            {datos === '' ? (
              <RegisterPage />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )}
          </Route>
          <Route exact path="/register/topic">
            <RegisterTopicPage />
          </Route>
          <Route exact path="/register/community">
            <RegisterCommunityPage />
          </Route>
          <Route exact path="/login">
            {datos === '' ? (
              <LoginPage />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )}
          </Route>
          <Route path="/p/:id">
            <PostPage />
          </Route>
          <Route path="/c">
            <FollowCommunityPage />
          </Route>
          <Route path="/t">
            <FollowTopicPage />
          </Route>
          <Route path="/u/:id">
            <UserPage useModal={useModal} />
          </Route>
          <Route path="/*">
            <Page404 />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
