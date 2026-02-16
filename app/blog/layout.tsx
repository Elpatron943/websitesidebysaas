export const metadata = {
  title: 'Blog | Side by SaaS',
  description: 'Articles et actualités Side by SaaS – acheteurs et éditeurs SaaS.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
