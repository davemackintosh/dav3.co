---
title: Deploying a CloudFlare Worker to a custom domain with specified environment
keywords: 
  - Cloudflare
  - Workers
  - Wrangler
  - DNS
excerpt: Took me a few minutes to work out how to publish my wrangler worker to a custom domain from my Github action based on the environment from the branch.
author: davemackintosh
published: 2025-03-04T20:57:24.394Z
---

I have a project at the moment and given that Vercel doesn't let you deploy private repos for free anymore I decided to try out CloudFlare workers instead of coming up with some complex mechanism to deploy my Next.JS app to S3.

To deploy my Next.JS app to CloudFlare workers on my custom domain I had to do a few things, I followed the generic instructions from CloudFlare on how to setup my `wrangler.jsonc` file and to create the workflow in Github.

I knew I wanted to have a couple of different environments for this new toy and decided I'd follow the old `main` and `dev` branch for production and development environments.

This means that I need to figure out how to configure multiple environments in my `wrangler.jsonc` file and how to deploy a specific one based on the branch name in my action. 

The action is quite simple, I have a workflow that listens to the success status of my "Test" workflow and kicks off the deployment workflow in the event the unit and integration tests all pass.

This is my Next.JS Cloudflare Worker deployment Github action.

```yaml
name: Deploy Worker
on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]
  workflow_run:
    workflows: ["Test"]
    branches: [main, dev]
    types: 
      - completed
env:
  CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

jobs:
  deploy_worker:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    steps:
    - name: Extract branch name
      shell: bash
      run: echo "branch=${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}" >> $GITHUB_OUTPUT
      id: extract_branch
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm install -g yarn && yarn
    - name: Deploy Worker
      run: yarn deploy:worker --env ${{ steps.extract_branch.outputs.branch }}
```

Breaking it down,

*   **`name: Deploy Worker`**:
    *   This line defines the name of the GitHub Actions workflow, which will appear in your repository's Actions tab.
*   **`on:`**:
    *   This section specifies the triggers that will initiate the workflow.
    *   **`push:`**:
        *   Triggers the workflow when code is pushed to the `main` or `dev` branches.
    *   **`pull_request:`**:
        *   Triggers the workflow when a pull request is made to the `main` or `dev` branches.
    *   **`workflow_run:`**:
        *   Triggers this workflow when another workflow completes.
        *   `workflows: ["Test"]` : This workflow will trigger when the "Test" workflow completes.
        *   `branches: [main, dev]` : Only triggers if the "Test" workflow ran on the main or dev branches.
        *   `types: - completed` : Only triggers when the "Test" workflow completed.
*   **`env:`**:
    *   This section defines environment variables that will be available throughout the workflow.
    *   **`CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}`**:
        *   Sets the Cloudflare API token from your repository's secrets. This is crucial for authenticating with Cloudflare.
*   **`jobs:`**:
    *   **`deploy_worker:`**:
    *   **`runs-on: ubuntu-latest`**:
    *   **`if: ${{ github.event.workflow_run.conclusion == 'success' }}`**:
        *   This line ensures that this job only runs if the preceding "Test" workflow completed successfully.
    *   **`steps:`**:
    *   **`name: Extract branch name`**:
    *   **`shell: bash`**:
    *   **`run: echo "branch=${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}" >> $GITHUB_OUTPUT`**:
        *   This command extracts the branch name from the `GITHUB_HEAD_REF` or `GITHUB_REF` environment variables and sets it as an output variable named `branch`.
    *   **`id: extract_branch`**:
        *   This line assigns the ID `extract_branch` to the step, allowing you to reference its outputs in later steps.
    *   **`uses: actions/checkout@v4`**:
    *   **`uses: actions/setup-node@v4`**:
    *   **`with: node-version: lts/*`**:
    *   **`name: Install dependencies`**:
    *   **`run: npm install -g yarn && yarn`**:
        *   Installs yarn globally, then installs the project's dependencies.
    *   **`name: Deploy Worker`**:
    *   **`run: yarn deploy:worker --env ${{ steps.extract_branch.outputs.branch }}`**:
        *   This command executes the `deploy:worker` script defined in your `package.json` file, passing the extracted branch name as the `--env` argument. This is copy and pasted from the generic wrangler instructions.


### And this is my `wrangler.jsonc` file:

```jsonc
{
	"main": ".open-next/worker.js",
	"name": "my-domain",
	"vars": {
		"ENVIRONMENT": "development",
		"NODE_ENV": "development"
	},
	"env": {
		"dev": {
			"vars": {
				"ENVIRONMENT": "development",
				"NODE_ENV": "development"
			},
			"routes": [
				{
					"pattern": "dev.my-domain.com",
					"custom_domain": true
				}
			]
		},
		"main": {
			"vars": {
				"ENVIRONMENT": "production",
				"NODE_ENV": "production"
			},
			"routes": [
				{
					"pattern": "my-domain.com",
					"custom_domain": true
				}
			]
		}
	},
	"compatibility_date": "2024-09-23",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"assets": {
		"directory": ".open-next/assets",
		"binding": "ASSETS"
	}
}
```

This is mostly a standard config file with the deletion of one property and addition of a new one. I had to delete the default top level `route` key as I wanted multiple routes/workers.

I then had to add the env block, note that this dictionary has two keys- aptly named `main` and `dev` which match my git branch names for these target environments and my trunk based development habits.

The real clincher here was the `"routes"` property for **each** environment, as opposed to the documentation saying to have it at the top level and to specify the `custom_domain` property for each one to avoid having to mess with any DNS at all.