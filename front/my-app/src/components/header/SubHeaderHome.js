import MenuLink from './MenuLink.js';

const SubHeaderHome = () => {
  return (
    <div className="sub-header-home">
      <ul>
        <MenuLink to="/new" label="New" className="link" />
        <MenuLink
          activeOnlyWhenExact={true}
          to="/"
          label="Home"
          className="link"
        />
        <MenuLink to="/popular" label="Popular" className="link" />
      </ul>
    </div>
  );
};

export default SubHeaderHome;
