import { ReactComponent as IconFlagSvg } from './svg/IconFlag.svg';

const IconFlag = ({ className, onClick }) => (
  <IconFlagSvg className={className} onClick={onClick} />
);

export default IconFlag;
