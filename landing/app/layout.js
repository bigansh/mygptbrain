import './globals.css'
export const metadata = {
    title: 'myGPTBrain - QnA over your personal data & bookmarks',
    description: 'QnA over your personal data & bookmarks',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
