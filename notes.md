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
