function Post({ alt, date, image, title, url }) {
  return (
    <div>
      <a href={url}>
        <img alt={alt} src={image} />
      </a>
      <div>
        <h2>{title}</h2>
        <h4>{date}</h4>
      </div>
    </div>
  );
}

export default Post;
