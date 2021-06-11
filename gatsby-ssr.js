/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

const React = require('react')

exports.onRenderBody = (
  { setHeadComponents },
  pluginOptions
) => {
  const pluginConfig = pluginOptions.pluginConfig || {}
  const defaultDigitalData = pluginOptions.digitalDataDefaults || { page: { pageInfo: {} } }

  // Don't run when Gatsby is building --
  if (typeof window !== 'undefined') {
    window.digitalData = defaultDigitalData
  }

  return setHeadComponents([
    <script
      key='gatsby-plugin-adobe-launch-advanced'
      async
      src={pluginConfig.analyticsScript}
    />
  ])
}
