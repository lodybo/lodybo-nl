export const loader = async () => {
  // Only for localhost development/testing of Plausible
  // const plausibleScriptData = await fetch(
  //   'https://plausible.io/js/script.local.js',
  // );
  const plausibleScriptData = await fetch('https://plausible.io/js/script.js');
  const script = await plausibleScriptData.text();

  return new Response(script, {
    status: 200,
    headers: {
      'Content-Type': 'text/javascript',
    },
  });
};
