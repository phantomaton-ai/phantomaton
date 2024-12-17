import path from 'path';
import { expect } from 'lovecraft';
import { fileURLToPath } from 'url';

import importer from './importer.js';

describe('importer', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  it('creates an importer with a specific root', async () => {
    const rootImporter = importer(__dirname);
    expect(rootImporter.root).to.equal(__dirname);
  });

  it('handles relative path imports', async () => {
    const rootImporter = importer(__dirname);
    const imported = await rootImporter.import('./importer.js');
    expect(imported).to.be.an('object');
    expect(imported.default).to.be.a('function');
  });

  it('handles absolute module imports', async () => {
    const rootImporter = importer(__dirname);
    const imported = await rootImporter.import('path');
    expect(imported).to.be.an('object');
    expect(imported.resolve).to.be.a('function');
  });

  it('throws an error for non-existent relative imports', async () => {
    const rootImporter = importer(__dirname);
    try {
      await rootImporter.import('./non-existent-file.js');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});