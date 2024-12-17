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
    try {
      // If it's a relative path, resolve it relative to the root
      if (name.startsWith('./') || name.startsWith('../')) {
        const fullPath = path.resolve(this.root, name);
        return await import(`file://${fullPath}`);
      }
      
      // Otherwise, use standard import
      return await import(name);
    } catch (error) {
      console.error(`Error importing ${name}:`, error);
      throw error;
    }
  }

  /**
   * Creates an importer with a specific root directory
   * @param {string} root - Root directory for relative imports
   * @returns {Importer} New Importer instance
   */
  static fromRoot(root) {
    return new Importer(root);
  }
}

const importer = new Importer();
export default importer;
export { Importer };