import './globals.css'

export const metadata = {
  title: 'Happy Hours',
  description: 'Your AI Bartender with a Smoky Twist',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F14] text-[#F5E9D0]">
        {children}
      </body>
    </html>
  )
}
