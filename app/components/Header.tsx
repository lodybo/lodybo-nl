import lody from '~/assets/images/header.jpg';

export default function Header() {
  return (
    <div className="w-full relative mb-16 flex flex-col md:flex-row gap-10 md:gap-5 h-full">
      <img
        className="w-full h-screen object-cover"
        src={lody}
        alt="Me, on stage"
      />

      <div className="absolute max-w-lg right-20 top-10 h-full flex flex-col gap-4 justify-center text-center md:text-left text-nord-6">
        <h1 className="text-4xl sm:text-6xl xl:text-8xl font-black">
          Hello, I'm Lody
        </h1>
        <p className="text-xl sm:text-3xl leading-relaxed font-light">
          Front-end developer and musician.
        </p>
      </div>
    </div>
  );
}
