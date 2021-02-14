const PostBodyImage = ({ data, type, alt }) => {
  return (
    <main className={type}>
      <h2>{data.postTitle}</h2>
      <img src={data.postContent} alt={alt} />
    </main>
  );
};

export default PostBodyImage;
