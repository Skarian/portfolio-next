import NextImage from 'next/image';
import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Image = ({ wrapper, src, ...props }) => {
  const { data, error } = useSwr(`/api/image/&url=${encodeURIComponent(src)}`, fetcher);
  if (!src.startsWith('/')) {
    if (error && props.layout !== 'fill') return <div>Failed to load...</div>;
    if (!data && props.layout !== 'fill') return <div>Loading...</div>;
    return (
      <div className={wrapper}>
        <NextImage
          src={`https://res.cloudinary.com/nskaria/image/fetch/q_auto,w_auto/${src}`}
          width={props.layout === 'fill' ? undefined : data.name.width}
          height={props.layout === 'fill' ? undefined : data.name.height}
          {...props}
        />
      </div>
    );
  } else {
    if (error && props.layout !== 'fill') return <div>Failed to load...</div>;
    if (!data && props.layout !== 'fill') return <div>Loading...</div>;
    return (
      <div className={wrapper}>
        <NextImage
          src={src}
          width={props.layout === 'fill' ? undefined : data.name.width}
          height={props.layout === 'fill' ? undefined : data.name.height}
          {...props}
        />
      </div>
    );
  }
};

export default Image;

// const MarkdownImage = ({ wrapper, src, ...props }) => {
//   const { data, error } = useSwr(`/api/image/&url=${encodeURIComponent(src)}`, fetcher);
//   if (error) return <div>Failed to load users</div>;
//   if (!data) return <div>Loading...</div>;
//   return (
//     <div className="flex justify-cente">
//       <NextImage
//         src={`https://res.cloudinary.com/nskaria/image/fetch/q_auto,w_auto/${src}`}
//         width={data.name.width}
//         height={data.name.height}
//         {...props}
//       />
//     </div>
//   );
// };
