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

  beforeEach(() => {
    start = stub();
    const installs = {
      'start-plugin': [
        priestess.start.provider([], () => start)
      ]
    };
    stub(Importer.prototype, 'import').callsFake(module => ({ default: () => ({
      install: installs[module] || []
    }) }));
  });

  afterEach(() => {
    Importer.prototype.import.restore();
  });

  it('imports modules', async () => {
    await phantomaton(TEST);
    expect(Importer.prototype.import.calledWith('start-plugin')).to.be.true;
    expect(Importer.prototype.import.calledWith('conf-plugin')).to.be.false;
  });

  it('imports configured modules too', async () => {
    await phantomaton(TEST, { install: ['conf-plugin'] });
    expect(Importer.prototype.import.calledWith('start-plugin')).to.be.true;
    expect(Importer.prototype.import.calledWith('conf-plugin')).to.be.true;
  });
});
