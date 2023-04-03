import AnchorLink from '~/components/AnchorLink';
import MainSection from '~/components/MainSection';

export default function Bio() {
  return (
    <MainSection className="mb-20">
      <p className="text-xl sm:text-3xl leading-relaxed font-light">
        Born and raised in The Netherlands, currently work at{' '}
        <AnchorLink href="https://www.taf.nl">TAF</AnchorLink>, and I
        occasionally{' '}
        <AnchorLink href="https://www.themarch.nl">make</AnchorLink>{' '}
        <AnchorLink href="https://www.borgersfamilie.nl/">music</AnchorLink>{' '}
        too.
      </p>
    </MainSection>
  );
}
