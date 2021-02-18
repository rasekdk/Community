import SettingsSection from '../Settings/SettingsSection';
import SettingsItem from '../Settings/SettingsItem';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useRemoteData from '../../hooks/useRemoteData';
import { decodeToken } from 'react-jwt';
import IconLogo from '../icons/IconLogo';
import SignButton from '../visualComponents/SignButton';

const SettingsAccountPage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;

  const decodedToken = decodeToken(auth);
  const userUrl = `${REACT_APP_URL}/u/${decodedToken.name}`;

  const [user, setUser] = useRemoteData(userUrl, auth);

  const useLogOut = () => setAuth('');

  return (
    <section className="main-section have-sub-header settings-section no-padding">
      <SettingsSection sectionTitle={'Información de usuario'} className="padding-bottom">
        <SettingsItem title={`Avatar`} to={'/settings/account/avatar'} className="unfocus-text">
          {user ? (
            user.userAvatar === 'avatar-img' || !user.userAvatar ? (
              <IconLogo className="logo ico medium" />
            ) : (
              <img src={`${REACT_APP_URL_IMG}/${user.userAvatar}`} alt="user avatar" className=" medium ico" />
            )
          ) : (
            <IconLogo className="logo ico medium" />
          )}
        </SettingsItem>
        <SettingsItem title={'Biografía'} to={'/settings/account/bio'} className="unfocus-text" />
      </SettingsSection>

      <SettingsSection sectionTitle={'Inicio de sesión e información'} className="padding-bottom">
        <SettingsItem title={`Nombre de usuario`} to={'/settings/account/name'} className="unfocus-text" />
        <SettingsItem title={`Correo electrónico`} to={'/settings/account/email'} className="unfocus-text" />
        <SettingsItem title={`Contraseña`} to={'/settings/account/password'} className="unfocus-text" />
      </SettingsSection>
      <SignButton link="/" onClick={useLogOut} className={'log-out'} classNameDiv={'padding-small'}>
        {' '}
        Cerrar Sesion
      </SignButton>
    </section>
  );
};

export default SettingsAccountPage;
