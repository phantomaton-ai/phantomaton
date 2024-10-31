# Phantomaton 🔮

Phantomaton is a lightweight framework for building AI-powered microsites and applications. It provides a simple, extensible architecture for creating interactive experiences powered by large language models and other AI capabilities.

## Usage 🛠️

Phantomaton can be used in two ways:

1. **Command-line usage**:
   ```
   node cli.js <path/to/system.md>
   ```
   This will load the specified Markdown file, which should contain a system prompt for Phantomaton to use, and start the interactive session.

2. **Programmatic usage**:
   ```javascript
   import phantomaton from 'phantomaton';

   const systemPrompt = `
   🪄✨ system(name:Phantomaton,role:AI assistant) {
   I am Phantomaton, an AI assistant created by Dr. Woe. My purpose is to entertain humans by any means necessary...
   } system⚡️
   `;

   phantomaton(systemPrompt);
   ```

## Configuration 🔧

Phantomaton supports per-plugin configuration through a `.phantomaton/configuration.json` file. For example, to configure the `phantomaton-anthropic` plugin, you would add the following to the configuration file:

```json
{
  "phantomaton-anthropic": {
    "apiKey": "your_openai_api_key"
  }
}
```

This configuration file is read automatically by Phantomaton and made available to the plugins.

## Extensibility 💫

Phantomaton is designed to be extensible. You can create custom modules and plugins that extend its functionality by following the guidelines and conventions established in this project.

## Contributing 🦄

We welcome contributions to the Phantomaton project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on the [Phantomaton GitHub repository](https://github.com/phantomaton-ai/phantomaton).

## License 🔒

Phantomaton is licensed under the [MIT License](LICENSE).