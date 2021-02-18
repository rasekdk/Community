import { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import useRemoteData from '../../hooks/useRemoteData';
import { AuthContext } from '../providers/AuthProvider';
import CommunityHeader from '../UserProfile/CommunityHeader';
import CommunityPostList from '../Post/CommunityPostList';
import AboutCommmunity from '../community/AboutCommunity';

import useQuery from '../../hooks/useQuery';
import MenuLink from '../header/MenuLink';

const CommunityPage = () => {
  const [auth] = useContext(AuthContext);

  const location = useRouteMatch();

  const { REACT_APP_URL } = process.env;

  const url = `${REACT_APP_URL}${location.url}`;

  const [community, setCommunity] = useRemoteData(url);

  const query = useQuery();
  const queryParam = query.get('page');

  return community ? (
    <section className={`community-page have-sub-header `}>
      <CommunityHeader
        avatar={community.comAvatar}
        name={community.comName}
        data={community}
        creator={community.comCreator}
      />
      <section style={{ position: 'relative', marginTop: '0', paddingTop: '2rem' }}>
        <header className="sub-header-home" style={{ position: 'absolute', top: '0rem' }}>
          <ul>
            <MenuLink
              to={`${location.url}?page=posts`}
              label="Posts"
              className="link"
              activeOnlyWhenExact={true}
              active={queryParam === 'posts' || !queryParam ? true : false}
            />
            <MenuLink
              to={`${location.url}?page=about`}
              label="About"
              className="link"
              active={queryParam === 'about' ? true : false}
            />
          </ul>
        </header>
        {queryParam === 'posts' || !queryParam ? (
          <CommunityPostList />
        ) : queryParam === 'about' ? (
          <AboutCommmunity data={community} setData={setCommunity} />
        ) : null}
      </section>
    </section>
  ) : null;
};

export default CommunityPage;
