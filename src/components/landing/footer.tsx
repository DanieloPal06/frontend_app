interface FooterProps {
  content: {
    copyright: string;
    message: string;
  };
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="py-8 border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
        <p>{content.copyright}</p>
        <p className="mt-1">{content.message}</p>
      </div>
    </footer>
  );
}
