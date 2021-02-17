const SettingsSection = ({ children, sectionTitle, className }) => {
  return (
    <div className={`settings-section ${className}`}>
      <h3>{sectionTitle}</h3>
      {children}
    </div>
  );
};

export default SettingsSection;
