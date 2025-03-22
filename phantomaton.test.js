import { expect, stub } from 'lovecraft';
import hierophant from 'hierophant';
import priestess from 'priestess';

import Importer from './importer.js';
import phantomaton from './phantomaton.js';

const TEST = `
/install(module:start-plugin)
/install(module:some-plugin)
/install(module:some-other-plugin)

Testbot!
`;

describe('Phantomaton', () => {
  let start;
  const installs = {
    'start-plugin': [
      priestess.start.provider([], () => start)
    ]
  };
  const lookup = async (module) => ({ default: () => ({
    install: installs[module] || []
  }) });

  beforeEach(() => {
    start = stub();
    stub(Importer.prototype, 'import').callsFake(lookup);
  });

  afterEach(() => {
    Importer.prototype.import.restore();
  });

  it('imports modules', async () => {
    await phantomaton(TEST);
    expect(Importer.prototype.import.calledWith('start-plugin')).to.be.true;
    expect(Importer.prototype.import.calledWith('conf-plugin')).to.be.false;
  });

  it('accepts a root configuration', async () => {
    let root;
    const oldStub = Importer.prototype.import;
    Importer.prototype.import = function (m) {
      root = this.root;
      return oldStub(m);
    };
    await phantomaton(TEST, '/tmp/foo');
    expect(root).to.equal('/tmp/foo');
    Importer.prototype.import = oldStub;
  });

  it('imports configured modules too', async () => {
    await phantomaton(TEST, { install: ['conf-plugin'] });
    expect(Importer.prototype.import.calledWith('start-plugin')).to.be.true;
    expect(Importer.prototype.import.calledWith('conf-plugin')).to.be.true;
  });

  it('accepts instantiated plugins', async () => {
    await phantomaton('Hi!', { install: [{
      install: installs['start-plugin']
    }] });
  });
});
