# Action-first client runtime regression

The generated NIE/TIE pages bake their crawler intro and action-first filing card into HTML during the Netlify build. The legacy `app.js` direct-guide enhancement previously replaced the entire `#wizardResult` subtree after page load, which removed those baked elements and recreated the older Next steps / Forms / Official links blocks.

The deploy-time runtime patch now preserves the baked intro and action card when the current page's `data-guide-id` matches the guide being rendered. When an action card is present, the duplicated legacy filing blocks are removed after the enhanced render.

The Visual UX workflow checks both generated HTML and the deployed `app.js` on the Netlify preview so this raw-HTML-versus-browser-runtime gap cannot silently recur.
