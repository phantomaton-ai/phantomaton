import path from 'path';
import { fileURLToPath } from 'url';

class Importer {
  constructor(root = process.cwd()) {
    this.root = root;
  }

  /**
   * Resolves and imports a module
   * @param {string} name - Module name or path to import
   * @returns {Promise<Module>} Imported module
   */
  async import(name) {
   return (name.startsWith('../') || name.startsWith('./')) ?
      await import(`file://${path.resolve(this.root, name)}`) :
      await import(name);
  }
}

export default Importer;
