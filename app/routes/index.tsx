import Page from '~/layouts/Page';

import lody from '~/assets/images/lody.svg';
import AnchorLink from '~/components/AnchorLink';

export default function Index() {
  return (
    <Page>
      <div className="w-3/4 mx-auto mt-16 flex flex-row gap-5 h-80">
        <img src={lody} alt="Me" />

        <div className="h-full flex flex-col gap-4 justify-center">
          <h1 className="text-8xl font-black">Hello, I'm Lody</h1>
          <p className="text-3xl leading-relaxed font-light">
            Born and raised in The Netherlands, currently work at{' '}
            <AnchorLink href="https://www.taf.nl">TAF</AnchorLink>, and I
            occasionally{' '}
            <AnchorLink href="https://www.themarch.nl">make</AnchorLink>{' '}
            <AnchorLink href="https://www.borgersfamilie.nl/">music</AnchorLink>{' '}
            too.
          </p>
        </div>
      </div>
    </Page>
  );
}
