import type { Metadata } from 'next'

export const metadata: Metadata = {
  // TODO translate header as well
  // TODO header should display current page's title
  title: `Your Style - Men's finest encyclopedia`
  // TODO: dynamic based on language
  // description: 'My App is a...'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  // TODO lang should be dynamic
  <html lang="en">
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
)

export default RootLayout
