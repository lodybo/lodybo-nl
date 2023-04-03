import MainSection from '~/components/MainSection';

export default function Music() {
  return (
    <MainSection className="space-y-5">
      <h1 className="text-4xl">Music</h1>
      <p className="text-lg">Some records I'm on :)</p>

      <div className="grid grid-cold-2 gap-4">
        <iframe
          title="Kid Calloway - Born Again Man"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/album/5BgETtwK8ewldo7UNzBIT0?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <iframe
          title="Kid Calloway - II"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/album/2C3Rf7mXqreLtqcC9nVa6E?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <iframe
          title="Borgers - Family Life @ Blue Collar"
          className="col-span-2"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/album/0uW6IwulDuctTWdvczb9GC?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </MainSection>
  );
}
