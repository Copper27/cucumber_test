import type { Selector } from 'webdriverio';
import * as fs from "fs-extra";
import * as path from "path";
// data file points to locators that will be used
const data = fs.readJsonSync(path.join(__dirname, "..", "data", "webPostageLocators.json"));

/**
 * Check if the given elements text is the same as the given text
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase     Whether to check if the content equals the
 *                                  given text or not
 * @param  {String}   expectedText  The text to validate against
 */
export default (
    selector: 'lbs' | 'oz',
    falseCase: boolean,
    expectedText: string
) => {
    /**
     * The command to execute on the browser object
     * @type {String}
     */
    let command: 'getText' | 'getValue' = 'getValue';
    
    let selectorString = selector;
    for (const key in data) {
        let compare = key;
        if (compare.match(selectorString)) {
            selector = data[key];
        }
    }
    // console.log('SELECTOR', $(selector).getAttribute('value'));
    // if ($(selector).getAttribute('value') === null
    // ) {
    //     command = 'getText';
    // }

    /**
     * The expected text to validate against
     * @type {String}
     */
    let parsedExpectedText = expectedText;

    /**
     * Whether to check if the content equals the given text or not
     * @type {Boolean}
     */
    let boolFalseCase = !!falseCase;

    // Check for empty element
    if (typeof parsedExpectedText === 'function') {
        parsedExpectedText = '';

        boolFalseCase = !boolFalseCase;
    }

    if (parsedExpectedText === undefined && falseCase === undefined) {
        parsedExpectedText = '';
        boolFalseCase = true;
    }

    // if getValue returns empty string, try getText
    const text = $(selector)[command]();
    if (text.match("")) {
        command = 'getText';
        const text = $(selector)[command]();
    }

    browser.pause(5000);
    if (boolFalseCase) {
        expect(parsedExpectedText).not.toBe(text);
    } else {
        expect(parsedExpectedText).toBe(text);
    }
};
