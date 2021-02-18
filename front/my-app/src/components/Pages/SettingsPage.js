// Libraries
import { decodeToken } from 'react-jwt';
import useRemoteData from '../../hooks/useRemoteData';

// Icons
import IconLogo from '../icons/IconLogo';
import SettingsItem from '../Settings/SettingsItem';
import SettingsSection from '../Settings/SettingsSection';

const SettingsPage = ({ auth }) => {
  const decodedToken = decodeToken(auth);
  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;
  const url = `${REACT_APP_URL}/u/${decodedToken.name}`;

  const [user, setUser] = useRemoteData(url, auth);

  return (
    <section className="main-section have-sub-header settings-section no-padding">
      <SettingsSection sectionTitle={'Configuración de cuenta'}>
        <SettingsItem title={`u/${user.userName}`} to={'/settings/account'}>
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
        <SettingsItem title={'Pantalla'} to={'/settings/customize'} />
      </SettingsSection>
      <SettingsSection sectionTitle={'Comunidades'}></SettingsSection>
      <SettingsItem title={'Edita tus comunidades'} to={'settings/community'} />
      <SettingsSection sectionTitle={'Legal'}>
        <SettingsItem title={'Páginas legales'} to={'/settings/legal'} />
      </SettingsSection>
    </section>
  );
};
export default SettingsPage;
