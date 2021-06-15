import { doRouteSupression } from '../doRouteSupression'
import { JSDOM } from 'jsdom'

/* global expect test describe */

describe('test first', () => {
  let localStorage
  beforeEach(() => {  // eslint-disable-line
    const dom = new JSDOM('', {
      url: 'https://www.google.com'
    })
    localStorage = dom.window.localStorage
  })

  test('Empty localStorage - should not supress', () => {
    // Assume no localStorage, should be false
    expect(doRouteSupression(true, localStorage, ['v2.0', 'us', 'en', 'ignore', 'ignore'])).toBe(false)
  })
  test('LocalStorage with same previous pageview - should supress', () => {
    const testBreadcrumbs = ['v2.0', 'us', 'en', 'ignore2', 'ignore2']
    localStorage.setItem('gatstby_last_breadcrumbs', JSON.stringify({ lastBreadCrumbs: testBreadcrumbs, last_time: new Date().getTime() }))
    expect(doRouteSupression(true, localStorage, testBreadcrumbs)).toBe(true)
  })
  test('LocalStorage with same previous pageview but 2.1 seconds later - should NOT supress', () => {
    const testBreadcrumbs = ['v2.0', 'us', 'en', 'ignore3', 'ignore3']
    localStorage.setItem('gatstby_last_breadcrumbs', JSON.stringify({ lastBreadCrumbs: testBreadcrumbs, last_time: new Date().getTime() - 2100 }))
    expect(doRouteSupression(true, localStorage, testBreadcrumbs)).toBe(false)
  })
})
