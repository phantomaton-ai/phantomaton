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

phantomaton(`
/install(module:phantomaton-anthropic)
/install(module:phantomaton-projects)

Custom persona details...
`);
```

### Programmatic Options

```javascript
phantomaton(prompt, {
  configurations: {              // Configuration overrides (see below)
    'phantomaton-gemini': {
      modalities: ['TEXT', 'IMAGE'],
      model: 'gemini-2.0-flash-preview-image-generation'
    }
  },
  install: ['phantomaton-gemini'] // Plugins to install
});
```

## Configuration 🔧

Phantomaton supports layered configuration:

1. **Global Configuration**: `~/.phantomaton/configuration.json`
2. **Local Configuration**: `.phantomaton/configuration.json`
3. **Programmatic Configuration**: `options.configuration`

Configurations are merged, with local settings taking precedence.

### Configuration Options

The default persona requires the following options to be configured:

- `phantomaton-projects.home`: Directory where repositories are located
- `phantomaton-anthropic.apiKey`: Anthropic API key for language model interactions

Module-specific configurations may be added as needed.

## Default Persona 🤖

The default persona is a comprehensive code exploration and development companion:

### Capabilities

- Project management across multiple repositories
- File reading, writing, and manipulation
- Code generation and refactoring
- Multi-language support
- Intelligent code suggestions
- Workflow optimization
- Architectural analysis

### Persona File Syntax

Persona files use Markdown with embedded [Smarkup](https://github.com/phantomaton-ai/smarkup) directives:

```markdown
# My Custom Persona

/install(module:phantomaton-anthropic)
/install(module:phantomaton-projects)

## Persona Description

Custom configuration and personality traits...
```

#### Install Directive

The `/install` directive adds modules to the Phantomaton runtime:

- Syntax: `/install(module:module-name)`
- Multiple modules can be installed
- Modules must be pre-installed via `npm`

## Extensibility 💫

Phantomaton plugins are functions that accept a configuration and return an object with two key properties:

- `include`: An array of dependent plugin module names to be recursively installed
- `install`: An array of components to be added to the Phantomaton runtime

Example plugin structure:
```javascript
export default (config) => ({
  // Optional: Other plugins to install first
  include: ['dependency-plugin-1', 'dependency-plugin-2'],
  
  // Components to install in the Phantomaton runtime
  install: [
    // Hierophant components like resolvers, providers, etc.
    someResolver(),
    someProvider(config)
  ]
});
```

Extend Phantomaton's functionality through the [Phantomaton Plugins](https://github.com/phantomaton-ai/phantomaton-plugins) project or by creating your own custom plugins.

## Contributing 🦄

Contributions welcome! Submit ideas, bug reports, and pull requests to our [GitHub repository](https://github.com/phantomaton-ai/phantomaton).

## License 🔒

MIT License