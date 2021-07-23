import type { Selector } from 'webdriverio';
import * as fs from "fs-extra";
import * as path from "path";
import checkIfElementExists from '../lib/checkIfElementExists';
import clickElement from '../action/clickElement';
// data file points to locators that will be used
const data = fs.readJsonSync(path.join(__dirname, "..", "data", "webPostageLocators.json"));
/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   selector Element selector
 * @param  {String}   value   The value to set the selector to
 */
export default (
    selector: Selector, 
    value: string) => {
    browser.pause(2000);
    let select:Selector = '';
    // loop through data JSON file to match with selector location
    let selectorString = value.toString().replace(/\s+/g, '').toLowerCase();
    for (const key in data) {
        let compare = key.replace(/\s+/g, '').toLowerCase();
        if (compare.match(selectorString)) {
            select = data[key];
        }
    }
    checkIfElementExists(data.serviceDropdown, false, 1);

    // opens the combobox
    clickElement('click', 'selector', data.serviceDropdown);
    browser.pause(2000);
    // clicks on selected service
    clickElement('click', 'selector', select);
    browser.pause(2000);
};
