// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Route, Link, Switch, useLocation, Redirect } from 'react-router-dom';

// Providers
import { AuthContext } from './components/providers/AuthProvider.js';

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
import CreateCommunityPage from './components/Pages/CreateCommunityPage';
import FollowTopicPage from './components/Pages/FollowTopicPage';
import Page404 from './components/Pages/Page404';
import UserPage from './components/Pages/UserPage';
import SettingsPage from './components/Pages/SettingsPage';
import SettingsPageNoLogged from './components/Pages/SettingsPageNoLogged';
import SettingsCustomizePage from './components/Pages/SettingsCustomizePage';
import Pruebas from './components/Pages/Pruebas';

// Components
import NavBar from './components/NavBar/NavBar.js';
import NavItem from './components/NavBar/NavItem.js';
import Header from './components/header/Header.js';
import SubHeaderHome from './components/header/SubHeaderHome.js';
import SubHeaderBack from './components/header/SubHeaderBack.js';
import ModalSwitch from './components/Modals/ModalSwitch';
import AvatarModal from './components/UserProfile/AvatarModal';
import CreatePostModal from './components/Modals/CreatePostModal.js';
import BurgerMenu from './components/burgerMenu/BurgerMenu';
import BurgerMenuNoLogged from './components/burgerMenu/BurgerMenuNoLogged';

// Icons
import IconLogo from './components/icons/IconLogo';
import IconCommunities from './components/icons/IconCommunities.js';
import IconPost from './components/icons/IconPost.js';

// Hooks
import useChangeColor from './hooks/useColor.js';
import useFont from './hooks/useFont.js';
import useColor from './hooks/useColor.js';
import useTheme from './hooks/useTheme.js';
import CommunityPage from './components/Pages/ComunityPage.js';
import SettingsAccountPage from './components/Pages/SettingsAccountPage.js';
import SettingsAvatarPage from './components/Pages/SettingsAvatarPage.js';
import SettingsUserNamePage from './components/Pages/SettingsUserNamePage.js';
import SettingsEmailPage from './components/Pages/SettingsEmailPage.js';
import SettingsPasswordPage from './components/Pages/SettingsPasswordPage.js';
import SettingsCommunityPage from './components/Pages/SettingsCommunityPage.js';
import SettingsCommunityEditPage from './components/Pages/SettingsCommunitEditPage.js';
import SettingsCommunityAvatarPage from './components/Pages/SettingsCommunityBioPage.js';

function App() {
  const [auth] = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState();
  const location = useLocation();
  const routesLogin = [
    '/register',
    '/login',
    '/register/topic',
    '/register/community',
    '/settings/account/avatar',
    '/settings/account/name',
    '/settings/account/password',
    '/settings/account/email',
  ];
  const routesHome = ['', '/', '/new', '/home', '/popular'];
  const [postModal, setPostModal] = useState(false);
  const [burgerModal, setBurgerModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [theme, setTheme] = useTheme();
  useFont();
  useColor(theme, setTheme);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const usePostModal = () => setPostModal(!postModal);
  const hideAvatarModal = () => setAvatarModal(!avatarModal);
  const hideBurgerModal = () => setBurgerModal(!burgerModal);
  const useModal = () => {
    console.log('hola');
  };

  return (
    <div className={'App green'}>
      {postModal ? <CreatePostModal method={'POST'} hideModal={usePostModal} modalHandler={postModal} /> : null}

      {burgerModal ? (
        auth ? (
          <BurgerMenu hideModal={hideBurgerModal} modalHandler={burgerModal} />
        ) : (
          <BurgerMenuNoLogged hideModal={hideBurgerModal} modalHandler={burgerModal} />
        )
      ) : null}

      <Header burger={burgerModal} setBurger={setBurgerModal} />
      {routesHome.includes(currentRoute) ? <SubHeaderHome /> : null}
      {routesHome.includes(currentRoute) || routesLogin.includes(currentRoute) ? null : (
        <SubHeaderBack currentRoute={currentRoute} />
      )}

      <NavBar>
        <NavItem name="logo-ico">
          <Link to="/" className="icon-link">
            <IconLogo className="logo ico small" />
          </Link>
        </NavItem>
        <NavItem name="post-ico">
          {auth !== '' ? (
            <i to="#" className="icon-link" onClick={usePostModal}>
              <IconPost className="create-post ico small" />
            </i>
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

      <main>
        <Switch>
          <Route exact path="/home">
            <Redirect to={'/'} />
          </Route>
          <Route exact path="/">
            {auth !== '' ? <HomePageLogged /> : <HomePageNoLogged />}
          </Route>
          <Route path="/new">
            <NewsPage />
          </Route>
          <Route path="/popular">
            <PopularPage />
          </Route>
          <Route exact path="/register">
            {auth === '' ? (
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
            {auth === '' ? (
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
          <Route path="/create/c">
            <CreateCommunityPage />
          </Route>
          <Route path="/c/:id">
            <CommunityPage />
          </Route>
          <Route exact path="/c">
            <FollowCommunityPage />
          </Route>
          <Route path="/t">
            <FollowTopicPage />
          </Route>
          <Route path="/u/:id">
            <UserPage useModal={useModal} />
          </Route>
          <Route exact path="/settings/">
            {auth === '' ? <SettingsPageNoLogged /> : <SettingsPage auth={auth} />}
          </Route>
          <Route exact path="/settings/account">
            <SettingsAccountPage />
          </Route>
          <Route exact path="/settings/account/avatar">
            <SettingsAvatarPage />
          </Route>
          <Route exact path="/settings/account/name">
            <SettingsUserNamePage />
          </Route>
          <Route exact path="/settings/account/email">
            <SettingsEmailPage />
          </Route>
          <Route exact path="/settings/account/password">
            <SettingsPasswordPage />
          </Route>
          <Route exact path="/settings/community">
            <SettingsCommunityPage />
          </Route>
          <Route exact path="/settings/community/:id">
            <SettingsCommunityEditPage />
          </Route>
          <Route exact path="/settings/customize">
            <SettingsCustomizePage auth={auth} />
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
