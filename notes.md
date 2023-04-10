# Development Notes

## Release

### Configuration Files

- [release workflow](./.github/workflows/release.yaml)
- [npm](./.github/workflows/release.yaml)

### [NPM JS](https://www.npmjs.com/package/chai-ts)

- Create a 'granular token' with the right permissions

### [GitHub](https://github.com/m-paternostro)

- Create a new 'Secrets and Variables > Action > Repository Secrets' named `NPM_PUBLISH_TOKEN`
  - The name must match the content of the [release workflow](#configuration-files)
  - The value is the [granular token](#npm-js)

### Publish

- Create a new [release](https://github.com/m-paternostro/chai-ts/releases) using a tag whose format is `v.x.x.x`

## TypeScript

The current TypeScript version for the project is `4.9.x`. When it's time to move up to `5`, both [package.json](./package.json) and [dependabot.yaml](./.github/dependabot.yaml) must be updated accordingly.
