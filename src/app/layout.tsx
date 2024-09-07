import { Providers } from './providers'
import Navigation from './components/Navigation'
import { Box } from '@chakra-ui/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box>
            <Navigation />
            <Box as="main">
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  )
}