import { Browser } from 'webdriverio';
import { Before, BeforeAll } from '@cucumber/cucumber';
import { hooks } from '../hooks';
import { HookFunctions } from '@wdio/types/build/Services';
import { config } from '../../../wdio.conf';
import * as fs from "fs-extra";
import * as path from "path";
import { RemoteCapabilities } from '@wdio/types/build/Capabilities';
const WebDriver = require('webdriverio');
const wdio = fs.readFileSync(path.join(__dirname, "..", "..", "..", "wdio.conf.ts"));
let hk: HookFunctions;
let cfg: WebdriverIO.Config;
/**
 * Open a browser
 * @param  {String}   selectBrowser  Select which browser to use
 */

// Was hoping to have the "browser" be a parameter so you can define which browser to test with in the Given step
 export default (selectBrowser: string) => {
    let cap: RemoteCapabilities = {
    }
    const capabilities = 
       {
           maxInstances: 5,
           browserName: selectBrowser,
           acceptInsecureCerts: true
       }
     BeforeAll (function () {
         console.log('BEFORE ALL');
     })
     console.log(wdio);

    //hk.onPrepare(cfg, cap);
};
