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
      className={`flex flex-col sm:flex-row gap-2 w-full ${
        wide ? 'col-span-2' : ''
      }`}
    >
      <div className="w-full sm:w-1/3 md:w-1/2 h-32 sm:h-80 object-cover">
        <ParallaxImage
          alt={name}
          src={`${image}?w=200`}
          srcSet={`${image}?w=400 2x, ${image}?w=600 3x`}
        />
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 flex flex-col">
        <h2 className="text-2xl mb-5">{name}</h2>
        <p>{description}</p>
        <AnchorLink href={url} className="mt-5 sm:mt-auto w-auto">
          {type === 'website' ? 'Visit website' : 'View source on GitHub'}
        </AnchorLink>
      </div>
    </div>
  );
}
