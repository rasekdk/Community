// Libraries

// Icons
import SettingsItem from '../Settings/SettingsItem';
import SettingsSection from '../Settings/SettingsSection';

const SettingsPage = () => {
  return (
    <section className="main-section have-sub-header settings-section no-padding">
      <SettingsSection sectionTitle={'Configuración de cuenta'}>
        <SettingsItem title={'Pantalla'} to={'/settings/customize'} />
      </SettingsSection>

      <SettingsSection sectionTitle={'Legal'}>
        <SettingsItem title={'Páginas legales'} to={'/settings/legal'} />
      </SettingsSection>
    </section>
  );
};
export default SettingsPage;
