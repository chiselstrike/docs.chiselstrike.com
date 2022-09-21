# ChiselStrike docs

These docs are built using [Docusaurus 2][docusaurus], a modern static website
generator. They are deployed to a [Vercel project][vercel-project] for hosting.

# Project structure

Top-level directories are:

| Directory | Purpose |
| --- | --- |
| `home` | Welcome page and all non-technical content |
| `reference` | Reference documentation that describes ChiselStrike features |
| `tutorials` | Step-by-step guides that developers can follow along with |
| `examples` | Fully-baked sample integrations |
| `static` | All static content, such as images |
| `src/css` | Custom CSS |

You can think of `home`, `reference`, `tutorials`, and `examples` as individual
mini-sites that contribue a section to the documentation.  They each have their
own `sidebars.js` configuration that determines its structure.

## Local development

### Authoring conventions

- Prefer to use VSCode with the [Rewrap][rewrap] extension. This repo configures
  Rewrap at 80 columns. While Rewrap automatically wraps text while typing, it
  will not in all cases. Use the ALT-q (or CMD-q on MacOS) to format the
  paragraph of text where the cursor is. *Please do not let lines get longer
  than 80 characters except where necessary.*

- You may wish to use the [Code Spell Checker][cspell] extension with VSCode for
  spell checking. It is already configured for use in this repo with product
  words to ignore for checking.

- We use a formal tech writing style for all technical content. Don't be
  surprised if someone gives you a lot of style feedback in your pull request!

### Initial setup

All development should be done on a personal fork of this repo. Submit your pull
requests from there. After creating a fork:

1. Clone your fork, replacing YourUserName below:

   ```bash
   git clone git@github.com:YourUserName/docs.chiselstrike.com.git
   ```

1. Install node modules:

   ```bash
   npm install
   ```

1. Set the upstream remote:

   ```bash
   git remote add upstream git@github.com:chiselstrike/docs.chiselstrike.com.git
   ```

### Workflow

1. Swtich to your main branch and sync with upstream:

   ```bash
   git checkout main
   git fetch upstream
   git rebase upstream/main
   ```

   Optionally, push your main branch to your origin:

   ```bash
   git push
   ```

1. Create a branch for feature development:

   ```bash
   git checkout -b my-feature
   ```

1. Run the local Docusaurus dev server:

   ```bash
   npm run start
   ```

   The server runs at http://localhost:3000/

1. Make changes to the content. When you save a file, the local server should
   autmoatically reload them. There are circumstances where the local server
   might get stuck and stop reloading - perform a browser reload to reset.

1. Commit changes to the branch. Please keep each set of changes in separate
   commits. For example, if you are updating node package versions along with
   your changes, keep the changes to package.json separate from your content
   changes.

   ```bash
   git add .
   git commit
   ```

1. Before pushing anything, do a full build of the docs locally. This will help
   find problems such as broken links. Don't push anything that causes an
   Docusaurus warning in the output.

   ```bash
   npm run build
   ```

1. Push the commits to a branch on your origin fork. The first time you commit,
   you should set an upstream branch:

   ```bash
   git push --set-upstream origin my-feature
   ```

1. Create a pull request back to the upstream repo. The target branch must be
   `main` since Vercel uses the commits there to push updates to
   https://docs.chiselstrike.com.

1. If you are a ChiselStrike team member, Vercel will create a preview link with
   the content of your updates. This link will appear from the Vercel bot in
   your pull request.

1. If you have corrections to the content, you can amend your commit and force
   push it:

   ```bash
   git add .
   git commit --amend
   git push -f
   ```

   If you have multiple comments, do an interactive rebase to make sure the
   correct commit contains the relevant change.

   After force pushing the branch, Vercel will deploy again and create another
   preview link.

1. After everyone is satisfied with the update, merge the pull request to the
   main branch.


[docusaurus]: https://docusaurus.io/
[vercel-project]: https://vercel.com/chiselstrike/docs-chiselstrike-com
[rewrap]: https://marketplace.visualstudio.com/items?itemName=stkb.rewrap
