/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import { doRouteSupression } from './doRouteSupression'

const onRouteUpdate = (
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
      // Check for last set of breadcrumbs stored
      const supressCallOption = pluginOptions.enableDuplicateRouteSupression
      const supressCall = false
      // eslint-disable-next-line
      doRouteSupression(pluginOptions.enableDuplicateRouteSupression, localStorage, adjustedBreadCrumbs)

      if (!supressCall) {
        window.dispatchEvent(
          // eslint-disable-next-line
          new CustomEvent(`${events.onRouteUpdate}`, {
            detail: {
              breadCrumbs: adjustedBreadCrumbs
            }
          })
        )
        if (supressCallOption) {
          // eslint-disable-next-line
          localStorage.setItem('gatstby_last_breadcrumbs', JSON.stringify(
            { lastBreadCrumbs: adjustedBreadCrumbs, last_time: new Date().getTime() }))
        }
      }
    }
  }
}

// exports.onRouteUpdate =
export { onRouteUpdate }
// exports.onRouteUpdate =
