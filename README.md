# webcomp-license-plate
A webcomponent that display a swiss license-plate 

## Polyfill
To be supported crossbrowser, you'll need some polyfills that are commented out by default in the index.html file.
Just remove the comments to use the polyfill in dev mode.
If you need the polyfill for your application, you'll have to insert it manually with your other scripts.

- [ShadyDOM](https://github.com/webcomponents/shadydom) : ShadowDOM V1 shim
- [document-register-element](https://github.com/WebReflection/document-register-element) : A stand-alone working lightweight version of the W3C Custom Elements specification
- [custom-elements](https://github.com/webcomponents/custom-elements) : is still a work in progress but will be the official custom-element polyfill
