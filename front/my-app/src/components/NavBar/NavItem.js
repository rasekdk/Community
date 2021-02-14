const NavItem = (props) => {
  return <li className={props.name}>{props.children}</li>;
};

export default NavItem;
