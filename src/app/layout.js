"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const fonts_1 = require("@/lib/fonts");
const theme_provider_1 = require("@/components/theme-provider");
const theme_toggle_1 = require("@/components/ui/deprecated/theme-toggle");
const nav_1 = require("@/components/ui/deprecated/nav");
require("../styles/globals.css");
exports.metadata = {
    title: 'skwircle',
    description: 'Component documentation and experiments',
};
function RootLayout({ children, }) {
    return (<html lang="en" className={`${fonts_1.neueHaasGroteskText.variable} ${fonts_1.neueHaasGroteskDisplay.variable} bg-secondary_alt overscroll-none`} style={{ scrollbarGutter: 'stable' }} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark-mode');
                  }
                } catch (e) {}
              })();
            `,
        }}/>
      </head>
      <body className="font-body bg-secondary_alt overscroll-none noise-overlay noise-fixed noise-opacity-90">
        <theme_provider_1.ThemeProvider>
          <nav_1.FloatingNav />
          <theme_toggle_1.ThemeToggle />
          {children}
        </theme_provider_1.ThemeProvider>
      </body>
    </html>);
}
exports.default = RootLayout;
//# sourceMappingURL=layout.js.map