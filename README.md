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
# Use default configuration
phantomaton

# Optionally specify a custom configuration
phantomaton path/to/custom/configuration.md
```

### Programmatic Usage

```javascript
import phantomaton from 'phantomaton';

const customConfiguration = `
/install(module:phantomaton-anthropic)
/install(module:phantomaton-projects)

Custom configuration details...
`;

phantomaton(customConfiguration);
```

## Configuration 🔧

Phantomaton supports layered configuration:

1. **Global Configuration**: `~/.phantomaton/configuration.json`
2. **Project Configuration**: `.phantomaton/configuration.json`

Configurations are merged, with project-specific settings taking precedence.

### Configuration Options

- `phantomaton-projects.home`: Directory where repositories are located
- `phantomaton-anthropic.apiKey`: Anthropic API key for language model interactions
- Module-specific configurations can be added as needed

## Extensibility 💫

Phantomaton is designed to be modular. Plugins can extend functionality through:
- Custom modules
- Project-specific configurations
- Expanded interaction capabilities

## Contributing 🦄

Contributions welcome! Submit ideas, bug reports, and pull requests to our GitHub repository.

## License 🔒

MIT License