import { React } from '~/components/ReactIcon';
import { MarqueeRow } from '~/components/MarqueeRow';

const Marquee = () => (
  <div
    className="flex overflow-hidden select-none gap-4 "
    style={{
      maskImage:
        'linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))',
    }}
  >
    <MarqueeRow />
    <MarqueeRow />
  </div>
);
export default Marquee;
