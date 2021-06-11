/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
/* global CustomEvent */

exports.onRouteUpdate = (
  { location },
  pluginOptions
) => {
  const events = pluginOptions.events || {}
  if (typeof window !== 'undefined') {
    if (events.onRouteUpdate) {
      let defaultBreadCrumbs = []
      try {
        defaultBreadCrumbs = JSON.parse(JSON.stringify(window.digitalData.page.pageInfo.breadCrumbs)) || []
      } catch (e) {
        // Do nothing if error
      }
      const adjustedBreadCrumbs = JSON.parse(JSON.stringify(defaultBreadCrumbs))
      if (location.pathname.length > 1) {
        adjustedBreadCrumbs.push(location.pathname.replace(/^\/+/, '').replace(/\/+$/, ''))
      }
      window.dispatchEvent(
        new CustomEvent(`${events.onRouteUpdate}`, {
          detail: {
            breadCrumbs: adjustedBreadCrumbs
          }
        })
      )
    }
  }
}
