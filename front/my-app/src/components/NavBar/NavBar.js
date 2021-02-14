const NavBar = (props) => {
  return (
    <nav className="mobile-nav">
      <ul>{props.children}</ul>
    </nav>
  );
};

export default NavBar;
