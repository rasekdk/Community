import useChangeColor from '../../hooks/useChangeColor';

const Header = () => {
  return (
    <header>
      <img
        src="https://source.unsplash.com/150x150/?portrait"
        onClick={useChangeColor}
        alt="user avatar"
      />
      <form>
        <input placeholder="Search..." />
      </form>
    </header>
  );
};

export default Header;
