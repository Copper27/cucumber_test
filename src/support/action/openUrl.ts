/**
 * Open the given URL
 * @param  {String}   page The URL to navigate to
 */
 export default (page: string) => {
    /**
     * The URL to navigate to
     * @type {String}
     */
    browser.url(page);
};
