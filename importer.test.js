import { expect } from 'lovecraft';

import importer from './importer.js';

describe('importer', () => {
  it('re-exposes the global import function', async () => {
    const imported = await importer.import('./importer.js');
    expect(imported.default).to.equal(importer);
  });
});
