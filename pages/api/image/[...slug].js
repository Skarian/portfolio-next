const probe = require('probe-image-size');
import path from 'path';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
  const imgUrl = decodeURIComponent(req.query.slug).slice(5);
  if (imgUrl.startsWith('/')) {
    let result = await require('fs').readFileSync(
      path.join(serverRuntimeConfig.PROJECT_ROOT, `/public${imgUrl}`)
    );
    res.statucCode = 200;
    res.json({ name: probe.sync(result) });
  } else {
    let result = await probe(imgUrl);
    res.statusCode = 200;
    res.json({ name: result });
  }
};

// Last Working Version
// const probe = require('probe-image-size');

// export default async (req, res) => {
//   const imgUrl = decodeURIComponent(req.query.slug).slice(5);
//   let result = await probe(imgUrl);
//   res.statusCode = 200;
//   res.json({ name: result });
// };
