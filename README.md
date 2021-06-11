<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://hpe-com.github.io/implementation/img/hpe-logo-small.png" width="400" />
  </a>
</p>
<h1 align="center">
  Gatsby Adobe Launch Plugin
</h1>

A Gatsby plugin to simplify adding HPE analytics to your site.

## 🚀 Quick start

To get started creating using plugin, you can follow these steps:

1. Create a `plugins` folder in your Gatsby project folder and clone this repo:

```shell
mkdir plugins && cd plugins
git clone git@github.com:MattJermyWright/gatsby-plugin-adobe-launch-hpe.git
```

Your directory structure will look similar to this:

```text
/my-gatsby-site
├── gatsby-config.js
└── /src
    └── /pages
        └── /index.js
    /plugins
    └── /gatsby-plugin-adobe-launch-hpe
        ├── gatsby-browser.js
        └── ....
```

If you want to include the plugin outside of your project folder, [follow this guide.](https://www.gatsbyjs.com/plugins/gatsby-starter-plugin/)

2. Add the plugin to your `gatsby-config.js`:

Inside of the `gatsby-config.js` file of your site (in this case, `my-gatsby-site`), include the plugin in the `plugins` array:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-adobe-launch-hpe`,
      options: {
        pluginConfig: {
          analyticsScript: "URL pointing to the Adobe Launch script",
        },
        events: {
          onRouteUpdate: "ANALYTICS.PAGEVIEW" // Custom event used for page views in Launch
        },
        digitalDataDefaults: {
          // Use to set window.digitalData object on page
          // See https://www.w3.org/2013/12/ceddl-201312.pdf
          // Code adjusts / edits the breadCrumbs array
          page: { pageInfo: { 
            breadCrumbs: [] // Used to build the page name
          }}
        },
      }
    },
    // other gatsby plugins
    // ...
  ],
}
```

3. Verify the plugin was added correctly

You can verify your plugin was added to your site correctly by running `gatsby develop` for the site.

You should see a message logged to the console in the preinit phase of the Gatsby build process:

```shell
$ gatsby develop
success open and validate gatsby-configs - 0.119s
success load plugins - 1.737s
Loading plugin gatsby-plugin-adobe-launch-advanced.... # <--- Look for this
...
```


