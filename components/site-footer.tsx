export default function SiteFooter() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MSU Main Souvenirs. All rights reserved.</p>
      </div>
    </footer>
  )
}

