// @flow
import componentDom from './../templates/component.html';
import componentStyles from './../styles/component.scss';
import { text } from '../../../../Library/Caches/typescript/3.1/node_modules/@types/body-parser';

function createTemplate() {    
    const tplWrapper = document.createElement('template');    
    tplWrapper.innerHTML = `<style>${componentStyles}</style>${componentDom}`;
    return tplWrapper;
}

const selectorRegion = '.l-p-region';
const selectorRegionFlag = '.l-p-region-flag';
const selectorNumber = '.l-p-number';

/**
 * This is the LicensePlate webcomponent class that manage the 
 * 
 * @class LicensePlate
 */
export class LicensePlate extends HTMLElement {
    /**
     * @static
     * Returns a list of observed attributes
     */
    static get observedAttributes() { return ['region', 'number']; }

    /**
     * @static
     * Returns a list of acronyms that are the supported swiss regions 
     */
    static get supportedRegions() { return ['AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR', 'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG', 'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH']; }

    _number = 0;
    _region = "AG";
    _shadowRoot;

    /**
     * Constructor of the class. It's called when an instance of the element is created or upgraded.
     * Useful for initializing state, settings up event listeners, or creating shadow dom.
     * See the spec for restrictions on what you can do in the constructor.
     */
    constructor() {
        super();
        const content = createTemplate().content;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(content.cloneNode(true));
        this.innerHTML = '<h1>I\'m your Web-Component.</h1><p>Change me in <code>src/scripts/component.js</code></p>';
    }

    /**
     * Called every time the element is inserted into the DOM.
     * Useful for running setup code, such as fetching resources or rendering.
     * Generally, you should try to delay work until this time.
     */
    connectedCallback() {
        const textZone = this._shadowRoot.querySelector('.l-p-text-zone');
        textZone.addEventListener('resize', evt => console.log(evt), false);
    }

    /**
     * Called every time the element is removed from the DOM.
     * Useful for running clean up code.
     */
    disconnectedCallback() {

    }

    /**
     * Called when an observed attribute listed in the "static observedAttributes" has been added, removed, updated, or replaced
     * @param {string} attrName - the name of the attribute that changed
     * @param {string} oldVal - the name of the attribute that changed
     * @param {string} newVal - the name of the attribute that changed
     * @see observedAttributes
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'region') {
            this.region = newVal;
        } else if (attrName === 'number') {
            this.number = newVal;
        }
    }

    adaptTextSize() {
        if (textZone.getBoundingClientRect().width < textZone.offsetWidth) {
            console.log('should grow');
        }
    }
    
    setRegionFlag(region) {        
        const regionEl = this._shadowRoot.querySelector(selectorRegionFlag);
        
    }

    set region(value) {
        if (LicensePlate.supportedRegions.includes(value)) {
            this._region = value;
            const regionEl = this._shadowRoot.querySelector(selectorRegion);
            regionEl.innerHTML = value;
        }
    }

    set number(value) {
        if (typeof value === 'string') {
            value = +value;
        }
        if (typeof value !== 'number') {
            return;
        }
        this._number = value;
        const numberEl = this._shadowRoot.querySelector(selectorNumber);
        numberEl.innerHTML = value;
    }    
}
  
export function defineCustomElement() {
    customElements.define('license-plate', LicensePlate);
}