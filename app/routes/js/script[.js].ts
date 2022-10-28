export const loader = async () => {
  const plausibleScriptData = await fetch('https://plausible.io/js/script.js');
  const script = await plausibleScriptData.text();

  return new Response(script, {
    status: 200,
    headers: {
      'Content-Type': 'text/javascript',
    },
  });
};
