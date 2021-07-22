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
 */
export default (method: string, 
    selector: 'Print On' | 'Serial Number' | 'Mail from ZIP' | 'Mail To Country'| 'lbs', 
    value: string,
    selector2: 'lbs' | 'oz',
    value2: string) => {
    /**
     * The command to perform on the browser object (addValue or setValue)
     * @type {String}
     */
    const command = (method === 'add') ? 'addValue' : 'setValue';
    console.log('selector: ', selector);
    console.log('value: ', value);
    console.log('selector2: ', selector2);
    console.log('value2: ', value2);

    let select:Selector = '';
    let selectorString = selector.replace(/\s+/g, '').toLowerCase();
    for (const key in data) {
        let compare = key.replace(/\s+/g, '').toLowerCase();
        if (compare.match(selectorString)) {
            select = data[key];
        }
    }
    let select2: Selector = '';
    let selectorString2 = '';
    if (selector2 != null) {
        selectorString2 = selector2.replace(/\s+/g, '').toLowerCase();
        for (const key in data) {
            let compare = key.replace(/\s+/g, '').toLowerCase();
            if (compare.match(selectorString2)) {
                select2 = data[key];
            }
        }
    }

    let checkValue = value;
    let checkValue2 = '';
    if (value2 != null) {
        let checkValue2 = value2;
    }

    checkIfElementExists(select, false, 1);

    if (!value) {
        checkValue = '';
    }

    $(select)[command](checkValue);
    if (selector2 != null && value2 != null) {
        $(select2)[command](checkValue2);
    }
};
