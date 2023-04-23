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

## Test Coverage

### Test Coverage

- Use `nyc` with at least the `html` and `cobertura` reports (see [nyc configuration](./.nycrc)).

- The script `npm run test:coverage` runs the tests generating the coverage report into `./coverage/report`.

### [Code Coverage Action](.github/actions/code-coverage/action.yaml)

This action does not run the test but...

1. Uses [irongut/CodeCoverageSummary@v1.3.0](https://github.com/marketplace/actions/code-coverage-summary) to both output the coverage and to generate a nice markdown file, which includes a `img.shields.io` badge.

2. Uses `marocchino/sticky-pull-request-comment@v2` to add a comment to the PR stating the coverage.

3. Runs a bash script that isolates the badge from the generated markdown on step 1 and downloads the respective `.svg` file, saving it to `./coverage/coverage.svg` file.

### Publish the Coverage Reports

1. The Github repository [pages](https://github.com/m-paternostro/chai-ts/settings/pages) is set to use `Git Actions` to publish the pages, instead of loading them from a branch.

2. In the [ci workflow](.github/workflows/ci.yaml)

   1. The `test` step uses the actions `actions/configure-pages@v3` and `actions/upload-pages-artifact@v1` to prepare the pages and to upload the `./coverage` directory

      - Preparing the pages probably just need to be done once, so this may need to change if other steps are uploading content to the pages

   2. The `deploy-coverage` job deploys the uploaded content.
      - This job only works when ran from a branch that is allowed to deploy to the [github-pages](https://github.com/m-paternostro/chai-ts/settings/environments/994271236/edit) environment.
        - This environment is automatically created when preparing the pages
        - At the moment, only `main` is authorized
      - A permission error is thrown if the branch is not allowed, with a message that refers to the `id-token` permission
      - See the documentation for the [actions/deploy-pages@v2](https://github.com/actions/deploy-pages) action for more details.

### Using the Published Coverage

The pages for this repository are located at https://m-paternostro.github.io/chai-ts (this can be checked on the GitHub [pages](https://github.com/m-paternostro/chai-ts/settings/pages), after a workflow has successfully deployed pages). Moreover:

- badge: https://m-paternostro.github.io/chai-ts/coverage.svg
- html report: https://m-paternostro.github.io/chai-ts/report/index.html

With these, it's possible to write the `Coverage` badge in the [README.md](./README.md).
