export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#faf8f4' }}>
        {children}
      </body>
    </html>
  )
}
