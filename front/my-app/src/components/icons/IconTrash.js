import { ReactComponent as IconTrashSvg } from './svg/IconTrash.svg';

const IconTrash = ({ className, onClick }) => (
  <IconTrashSvg className={className} onClick={onClick} />
);

export default IconTrash;
