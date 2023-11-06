# which-files-changed - Github Action

📑 `which-files-changed` is a custom GitHub Action that compares the base branch and head branch of a pull request to identify which files have been changed. Depending on the configuration, it can either add the list of changed files as a comment to the pull request or include them as part of the pull request description.

## 🏄🏽‍♀️ Usage

To use this GitHub Action, you need to include it in your GitHub Actions workflow. Here are the steps to set up and configure it:

#### Workflow Configuration

1. Create a `.github/workflows/compare-files.yml` file in your repository.
2. Add the following workflow configuration to the yml.

```yml
name: Identify Changed Files

on:
  pull_request:
    types:
      - opened
      - synchronize

jobs:
  identify-changed-files:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Run which-files-changed
        uses: BuddhikaGeasman/which-files-changed@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          pr-comment: 'true' # or 'false' to control where to add the changes
```

#### Action Inputs

- `token` (required): The GitHub token for authentication, usually provided as `${{ secrets.GITHUB_TOKEN }}`.
- `pr-comment` (optional): A boolean value ('true' or 'false') to determine whether to add the list of changed files as a comment on the pull request.
- By default the action append the file changes as part of pr description.

#### Example View:

Checkout the [open pr](https://github.com/BuddhikaGeasman/which-files-changed/pull/1) where description has been updated with changed files.

## 👨‍💻 Contributing

- The project is set up with [bun](https://bun.sh/)
- Follow bun installation or node installation to set up.

#### With Bun

- Install: `bun install`
- Build: `bun run build`

#### With node

- Install: `npm install`
- Build: `npm run build`
