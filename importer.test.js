import path from 'path';
import { expect } from 'lovecraft';
import { fileURLToPath } from 'url';

import Importer from './importer.js';

describe('importer', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const importer = new Importer(__dirname);

  it('creates an importer with a specific root', () => {
    expect(importer.root).to.equal(__dirname);
  });

  it('handles relative path imports', async () => {
    const imported = await importer.import('./importer.js');
    expect(imported.default).to.be.a('function');
  });

  it('handles absolute module imports', async () => {
    const imported = await importer.import('path');
    expect(imported.resolve).to.be.a('function');
  });

  it('throws an error for non-existent relative imports', async () => {
    try {
      await importer.import('./non-existent-file.js');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});