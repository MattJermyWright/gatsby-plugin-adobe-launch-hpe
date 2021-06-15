export const doRouteSupression = (enableDuplicateRouteSupression, localStorage, currentBreadCrumbs) => {
  // Check for last set of breadcrumbs stored
  const supressCallOption = enableDuplicateRouteSupression
  let supressCall = false
  let lastBreadCrumbsObj
  try {
    lastBreadCrumbsObj = JSON.parse(localStorage.getItem('gatstby_last_breadcrumbs'))
    if (supressCallOption && (new Date()).getTime() - lastBreadCrumbsObj.last_time < 2000) {
      supressCall = JSON.stringify(lastBreadCrumbsObj.lastBreadCrumbs) === JSON.stringify(currentBreadCrumbs)
    }
  } catch (e) {
  }
  return supressCall
}
