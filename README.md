# Phantomaton 🔮

A lightweight, modular framework for AI-powered code exploration and development.

## Quickstart 🚀

1. **Install**:
   ```bash
   npm install -g phantomaton
   ```

2. **Configure**:
   ```json
   # ~/.phantomaton/configuration.json
   {
     "phantomaton-projects": {
       "home": "~/projects"
     },
     "phantomaton-anthropic": {
       "apiKey": "your-anthropic-api-key"
     }
   }
   ```

3. **Run**:
   ```bash
   phantomaton
   ```

## Overview 🌟

Phantomaton provides a flexible, extensible framework for exploring, generating, and managing code across multiple projects. By default, it operates as a coding companion that can read, write, and interact with project files.

## Usage 🛠️

### Command-line Usage

```bash
# Use default persona
phantomaton

# Optionally specify a custom persona
phantomaton path/to/custom/persona.md
```

### Programmatic Usage

```javascript
import phantomaton from 'phantomaton';

const persona = `
/install(module:phantomaton-anthropic)
/install(module:phantomaton-projects)

Custom persona details...
`;

phantomaton(persona);
```

## Configuration 🔧

Phantomaton supports layered configuration:

1. **Global Configuration**: `~/.phantomaton/configuration.json`
2. **Local Configuration**: `.phantomaton/configuration.json`

Configurations are merged, with local settings taking precedence.

### Configuration Options

The default persona requires the following options to be configured:

- `phantomaton-projects.home`: Directory where repositories are located
- `phantomaton-anthropic.apiKey`: Anthropic API key for language model interactions

Module-specific configurations may be added as needed.

## Extensibility 💫

Phantomaton is designed to be modular. Plugins can extend functionality through:
- Custom modules
- Project-specific configurations
- Expanded interaction capabilities

## Contributing 🦄

Contributions welcome! Submit ideas, bug reports, and pull requests to our [GitHub repository](https://github.com/phantomaton-ai/phantomaton).

## License 🔒

MIT License