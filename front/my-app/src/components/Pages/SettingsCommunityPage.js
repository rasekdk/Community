import SettingsSection from '../Settings/SettingsSection';
import SettingsItem from '../Settings/SettingsItem';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useRemoteData from '../../hooks/useRemoteData';
import { decodeToken } from 'react-jwt';
import IconLogo from '../icons/IconLogo';
import SignButton from '../visualComponents/SignButton';

const SettingsCommunityPage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const { REACT_APP_URL, REACT_APP_URL_IMG } = process.env;

  const decodedToken = decodeToken(auth);
  const userUrl = `${REACT_APP_URL}/u/${decodedToken.name}`;
  const communityUrl = `${REACT_APP_URL}/c/created`;

  const [user, setUser] = useRemoteData(userUrl, auth);

  const [communities, setCommunities] = useRemoteData(communityUrl, auth);

  const useLogOut = () => setAuth('');

  return (
    <section className="main-section have-sub-header settings-section no-padding">
      {communities[0] ? (
        <SettingsSection sectionTitle={'Comunidades Creadas'} className="padding-bottom">
          {communities.map((community) => (
            <SettingsItem
              title={community.comName}
              to={`/settings/community/${community.comName}`}
              className="unfocus-text"
            >
              {user ? (
                community.comAvatar === 'avatar-img' || !community.comAvatar ? (
                  <IconLogo className="logo ico medium" />
                ) : (
                  <img src={`${REACT_APP_URL_IMG}/${community.comAvatar}`} alt="user avatar" className=" medium ico" />
                )
              ) : (
                <IconLogo className="logo ico medium" />
              )}
            </SettingsItem>
          ))}
        </SettingsSection>
      ) : (
        <SettingsSection sectionTitle={'No has creado ninguna comunidad'} />
      )}

      <SignButton link="/create/c" onClick={useLogOut} className={'log-out'} classNameDiv={'padding-small'}>
        Crear Comunidad
      </SignButton>
    </section>
  );
};

export default SettingsCommunityPage;
