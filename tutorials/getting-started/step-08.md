# Step 8: Deploy to the ChiselStrike managed service

In this tutorial so far, you've used the ChiselStrike CLI to build your routes
and entities locally. In order to use ChiselStrike in your live projects, you
can deploy to ChiselStrike's managed serverless backend. Deployment involves:

- Creating a project in the ChiselStrike dashboard.
- Connecting the project to a GitHub repository that contains your code.
- Pushing the code to a branch of that repo.

## 1. Create a GitHub repo

Using your GitHub account, create a repository. Give it the name
"chiselstrike-tutorial". It can be either public or private. Take the defaults
for all other options.

## 2. Push your project code to GitHub

First, initialize the repo:

```bash
git init
```

Depending on your git configuration, you might get a message about the name of
the default branch. You can ignore this.

Set the name of the default branch to "main":

```bash
git branch -M main
```

Add a remote origin for the project.  Be sure to replace "ORGANIZATION" with the
name of your GitHub login, or whatever organization you used to create the repo:

```bash
git remote add origin git@github.com:ORGANIZATION/chiselstrike-tutorial.git
```

Add the project code and commit it:

```bash
git add .
git commit -m "First commit"
```

:::note

`chiselstrike-create-app` created a .gitignore for you. It will correctly omit
the files used by the CLI that are only used locally and should not be
committed.

:::

Push the code to the remote main branch:

```bash
git push --set-upstream origin main
```

## 3. Create and deploy a ChiselStrike project in the dashboard

1. In your browser, navigate to https://chiselstrike.com.

1. Click "Login" in the upper right.

1. Click "Connect with GitHub" to sign in with the same GitHub account you used to
create the repo.

1. Click the "New Project" button on the right.

1. Use the "Import Git Repository" option.

   At this point, normally, you would be able to find your repo in the UI
persented here.  However, if this is your first time using ChiselStrike with
this GitHub account, ChiselStrike will not have access to your repo. Note the
following message:

   > A repository is not showing up here? Check out your GitHub App settings

   Click the link in that message to configure the GitHub App for your account
   in GitHub. Set Repository access to "All repositories" and click Save.
   Alternatively, you can select the single chiselstrike-tutorial repo, but you
   will not able to able to deploy a second project with this option.

1. Go back to the ChiselStrike console and refresh the page.

1. Find the repo you created and click the "Import" button next to it. (If you
belong to multiple organizations, choose the one where the project was created.)

1. Select the main branch where you previously pushed the project code and click
"Deploy".

A new project will be created in the dashboard and the project will be deployed.
It will take a few moments. When the deployment is complete, you will see a list
of routes that you worked with previously in this tutorial.

## 4. Invoke the "hello" routes in your deployed project

After deployment is complete, you will see a summary of the project deployment.
Notice that the list of routes contains the routes you used earlier in this
tutorial ("hello" and "posts").

The endpoint URL format of the route is composed from information from GitHub
and your project:

> https://[REPO-NAME]-[GITHUB-ACCOUNT].chiselstrike.io/[BRANCH]/[ROUTE]

For example, if you followed this tutorial exactly, and your github account name
is "CharlieChiseler", the endpoint URL would be:

> https://chiselstrike-tutorial-charliechiseler.chiselstrike.io/main/posts

Copy the URL of the "hello" route using the copy button to the right of it,
then paste it into a curl command in your shell:

```bash
curl https://[REPO-NAME]-[GITHUB-ACCOUNT].chiselstrike.io/[BRANCH]/[ROUTE]
```

```
hello world
```

## 5. Experiment with your routes and entities

You are now able to run the same curl commands from earlier in this tutorial to
invoke routes and perform CRUD operations on the BlogPost entity. Feel free to
experiment with this as much as you like.

:::note

The deployment did not copy any of the data you created locally. You will have
to re-populate that data with new curl commands on the new endpoint URL.

:::

For example, to add a new entity with the "posts" route:

```bash
curl \
    -X POST \
    -d '{"author": "Glauber", "content": "...", "publishedAt": 999, "hidden": false}' \
    https://[REPO-NAME]-[GITHUB-ACCOUNT].chiselstrike.io/main/posts
```

And to get all posts:

```bash
curl https://[REPO-NAME]-[GITHUB-ACCOUNT].chiselstrike.io/main/posts
```
