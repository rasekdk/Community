// Libraries
import { useForm, useFormContext } from 'react-hook-form';
import { decodeToken } from 'react-jwt';
import useFont from '../../hooks/useFont';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useRemoteData from '../../hooks/useRemoteData';
import Post from '../Post/Post';
import DivHolder from '../visualComponents/DivHolder';

import IconCheckColor from '../icons/IconCheckColor';
import useColor from '../../hooks/useColor';
import useTheme from '../../hooks/useTheme';
// Icons

const SettingsCustomizePage = ({ auth }) => {
  const decodedToken = decodeToken(auth);
  // const [font, setFont] = useFont(url);

  const post = {
    postTitle: 'Los post de Community',
    postContent:
      'Los post de Community pueden contener imagenes y texto como este, y los puedes incluir en la comundad que mejor le encaje',
    postType: 'text',
  };

  const [font, setFont] = useFont();
  const [color, setColor] = useColor();
  const [theme, setTheme] = useTheme();

  return (
    <section className="main-section have-sub-header settings-section no-padding">
      <div className="settings-section" style={{ paddingBottom: '0.125rem' }}>
        <h3>Personalización</h3>
        <p className="settings-description">Perosnaliza el tamaño de letra, color principal y fondo</p>
      </div>

      <div style={{ padding: '0.5rem' }}>
        <Post data={post} />
      </div>

      <div className="settings-section" style={{ paddingBottom: '0.125rem' }}>
        <h3>Tamaño de letra</h3>
        <div className="settings-block font-selector">
          <p style={{ fontSize: '12px' }}>Aa</p>
          <div className={`12 ${font > 12 ? 'active' : font === 12 ? 'selected' : ''} `} onClick={() => setFont(12)} />
          <div className={`14 ${font > 14 ? 'active' : font === 14 ? 'selected' : ''} `} onClick={() => setFont(14)} />
          <div className={`16 ${font > 16 ? 'active' : font === 16 ? 'selected' : ''} `} onClick={() => setFont(16)} />
          <div className={`18 ${font > 18 ? 'active' : font === 18 ? 'selected' : ''} `} onClick={() => setFont(18)} />
          <div className={`20 ${font > 20 ? 'active' : font === 20 ? 'selected' : ''} `} onClick={() => setFont(20)} />
          <p style={{ fontSize: '20px' }}>Aa</p>
        </div>
      </div>

      <div className="settings-section" style={{ paddingBottom: '0.125rem' }}>
        <h3>Color principal</h3>
        <div className="settings-block color-block">
          <div className="settings-block">
            <IconCheckColor
              className={`ico x-large blue ${color === 'blue' ? 'active' : ''}`}
              onClick={() => setColor('blue')}
            />
            <IconCheckColor
              className={`ico x-large yellow ${color === 'yellow' ? 'active' : ''}`}
              onClick={() => setColor('yellow')}
            />
            <IconCheckColor
              className={`ico x-large pink ${color === 'pink' ? 'active' : ''}`}
              onClick={() => setColor('pink')}
            />
          </div>
          <div className="settings-block">
            <IconCheckColor
              className={`ico x-large purple ${color === 'purple' ? 'active' : ''}`}
              onClick={() => setColor('purple')}
            />
            <IconCheckColor
              className={`ico x-large orange ${color === 'orange' ? 'active' : ''}`}
              onClick={() => setColor('orange')}
            />
            <IconCheckColor
              className={`ico x-large green ${color === 'green' ? 'active' : ''}`}
              onClick={() => setColor('green')}
            />
          </div>
        </div>

        <div className="settings-section" style={{ paddingBottom: '0.125rem' }}>
          <h3>Fondo</h3>
          <div className="settings-block theme">
            <div
              className={`theme-selector dark ${theme === 'dark' ? 'active' : ''} `}
              onClick={() => setTheme('dark')}
            >
              <IconCheckColor className="ico medium" />
              <h3>Tema Oscuro</h3>
            </div>
            <div
              className={`theme-selector light ${theme === 'light' ? 'active' : ''}  `}
              onClick={() => setTheme('light')}
            >
              <IconCheckColor className="ico medium" />
              <h3>Tema Claro</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SettingsCustomizePage;
