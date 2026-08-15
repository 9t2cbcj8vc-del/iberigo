# Language switch hotfix

The homepage has two language layers: legacy `app.js` translations and the newer visual-overhaul hero/navigation/cards. The legacy layer updates in place, while the visual layer is created once from the language present at page boot.

The hotfix persists the selected language and performs a normal automatic homepage reload when switching EN/ES so both layers rebuild from the same language. Static guide language switches also persist the selected language before navigating to their counterpart page.

A deployed-preview Selenium check repeats EN → ES → EN → ES, verifies the actual visual navigation labels rather than only `document.lang`, checks guide language switching, and confirms the selected language survives a return to the homepage.
