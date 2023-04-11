import AnchorLink from '~/components/AnchorLink';
import ParallaxImage from '~/components/ParallaxImage';

type Props = {
  /**
   * The project's name
   */
  name: string;

  /**
   * The project's description
   */
  description: string;

  /**
   * The project's URL
   */
  url: string;

  /**
   * The project's image
   */
  image: string;

  /**
   * The project type.
   */
  type: 'website' | 'github';

  /**
   * If this project is displayed wide.
   */
  wide?: boolean;
};

export default function Project({
  name,
  description,
  url,
  image,
  type,
  wide,
}: Props) {
  return (
    <div
      className={`flex flex-row gap-2 h-32 w-full ${wide ? 'col-span-2' : ''}`}
    >
      <div className="w-1/3">
        <ParallaxImage
          alt={name}
          src={`${image}?w=200`}
          srcSet={`${image}?w=400 2x, ${image}?w=600 3x`}
        />
      </div>

      <div className=" flex flex-col">
        <h2 className="text-2xl">{name}</h2>
        <p>{description}</p>
        <AnchorLink href={url} className="mt-auto text-blue-500">
          {url}
        </AnchorLink>
      </div>
    </div>
  );
}