const CreatePostModalHeader = ({ postType, setPostType, setSelectedFile }) => {
  return (
    <div className="sub-header-modal">
      <ul>
        <li
          to="/new"
          className={`link ${postType === 'text' ? 'active' : 'unfocus'}`}
          onClick={() => {
            setPostType('text');
            setSelectedFile(undefined);
          }}
        >
          Text
        </li>
        <li
          to="/new"
          className={`link ${postType === 'image' ? 'active' : 'unfocus'}`}
          onClick={() => {
            setPostType('image');
          }}
        >
          Image
        </li>
      </ul>
    </div>
  );
};

export default CreatePostModalHeader;
