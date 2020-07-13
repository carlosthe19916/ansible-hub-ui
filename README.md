# Ansible Automation Hub UI

Frontend for Ansible Automation Hub. The backend for this project can be [found here](https://github.com/ansible/galaxy_ng/)

# Setting up Your Dev Environment

## Develop in Standalone Mode

1. Install node. Node v13+ are known to work. Older versions may work as well.
1. `npm ci`
1. `npm run start-standalone`

The app will run on http://localhost:8002 and proxy requests for `api/automation-hub` to the api on `http://localhost:5001`.

## Develop in Insights Mode

**NOTE:** This option is only available to Red Hat employees who have access to the Red Hat VPN. Community contributors should follow setup for [standalone mode](#develop-in-standalone-mode)

This app is part of the Red Hat cloud platform. Because of that the app needs to be loaded within the context of cloud.redhat.com. This is done by accessing the app via the [insights-proxy project](https://github.com/RedHatInsights/insights-proxy).

#### Set up Insights Proxy

- Install docker
- Clone this repo `git@github.com:RedHatInsights/insights-proxy.git` to your machine
- Inside the `insights-proxy/` directory on your computer, run the following scripts
  - `npm install`
  - `bash scripts/update.sh` This updates the insights proxy container to the latest version.
  - `sudo bash scripts/patch-etc-hosts.sh` This adds the following entries to your `/etc/hosts` file

```
127.0.0.1 prod.foo.redhat.com
127.0.0.1 stage.foo.redhat.com
127.0.0.1 qa.foo.redhat.com
127.0.0.1 ci.foo.redhat.com
```

Once all this is done, you can launch `insights-proxy` with this command:

```
SPANDX_CONFIG=/path/to/ansible-hub-ui/profiles/local-frontend-and-api.js bash /path/to/insights-proxy/scripts/run.sh
```

This should launch `insights-proxy`, which will redirect the routes defined in `profiles/local-frontend-and-api.js` to the automation hub UI running locally on your machine.

### Run the application

Execute:

```
npm run start
```

At this point you have `insights-proxy` and your this application running (previous command) so you can open:

[https://ci.foo.redhat.com:1337/beta/migrations/migration-analytics/](https://ci.foo.redhat.com:1337/beta/migrations/migration-analytics/)

##### NOTE

If you are on a Mac, you might have to make a small change to the `insights-proxy/scripts/run.sh` script. Update this line

```
REALPATH=`python2 -c 'import os,sys;print os.path.realpath(sys.argv[1])' $SPANDX_CONFIG`
```

to use `python` instead of `python2`.

## Patternfly

- This project imports Patternfly components:
  - [Patternfly React](https://github.com/patternfly/patternfly-react)

## Insights Components

Insights Platform will deliver components and static assets through [npm](https://www.npmjs.com/package/@red-hat-insights/insights-frontend-components). ESI tags are used to import the [chroming](https://github.com/RedHatInsights/insights-chrome) which takes care of the header, sidebar, and footer.
