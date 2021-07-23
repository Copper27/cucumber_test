import type { Selector } from 'webdriverio';
import * as fs from "fs-extra";
import * as path from "path";
import checkIfElementExists from '../lib/checkIfElementExists';
// data file points to locators that will be used
const data = fs.readJsonSync(path.join(__dirname, "..", "data", "webPostageLocators.json"));
/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   selector Element selector
 * @param  {String}   value   The value to set the selector to
 * @param  {String}   selector2 Optional second element selector
 * @param  {String}   value2 Optional second value to set selector2 to
 */
export default (method: string, 
    selector: Selector, 
    value: string,
    selector2: Selector,
    value2: string) => {
    /**
     * The command to perform on the browser object (addValue or setValue)
     * @type {String}
     */
    const command = (method === 'add') ? 'addValue' : 'setValue';
    // console.log('selector: ', selector);
    // console.log('value: ', value);
    // console.log('selector2: ', selector2);
    // console.log('value2: ', value2);

    // loop through data JSON file to match with selector location
    let select:Selector = '';
    let selectorString = selector.toString().replace(/\s+/g, '').toLowerCase();
    for (const key in data) {
        let compare = key.replace(/\s+/g, '').toLowerCase();
        if (compare.match(selectorString)) {
            select = data[key];
        }
    }
    let select2: Selector = '';
    let selectorString2 = '';
    // checks if optional parameters are present
    if (selector2 != null) {
        selectorString2 = selector2.toString().replace(/\s+/g, '').toLowerCase();
        for (const key in data) {
            let compare = key.replace(/\s+/g, '').toLowerCase();
            if (compare.match(selectorString2)) {
                select2 = data[key];
            }
        }
    }

    let checkValue = value;

    checkIfElementExists(select, false, 1);

    if (!value) {
        checkValue = '';
    }
    
    $(select)[command](checkValue);
    let checkValue2 = '';
    if (value2 != null) {
        let checkValue2 = value2;
        $(select2)[command](checkValue2);
    }
};
