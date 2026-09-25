import { BlocksRenderer } from "@strapi/blocks-react-renderer";

/*
 * Renders a Strapi "Rich text (Blocks)" field — a structured
 * JSON array like:
 *   [{ type: "paragraph", children: [{ type: "text", text: "..." }] }]
 *
 * This is DIFFERENT from the markdown string fields used
 * elsewhere (e.g. session_description on About/Privacy pages),
 * which are handled by renderDescription() in richText.tsx.
 * Use THIS renderer only for fields whose Strapi field type is
 * "Rich text (Blocks)".
 */
export const renderBlocks = (
  content: any,
  className = "text-lg text-muted-foreground leading-relaxed"
) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mb-3 last:mb-0">{children}</p>
          ),
          heading: ({ children, level }) => {
            const sizes: Record<number, string> = {
              1: "text-3xl",
              2: "text-2xl",
              3: "text-xl",
              4: "text-lg",
              5: "text-base",
              6: "text-sm",
            };
            const className = `font-display font-bold text-foreground mt-4 mb-2 ${sizes[level] || "text-lg"}`;

            switch (level) {
              case 1:
                return <h1 className={className}>{children}</h1>;
              case 2:
                return <h2 className={className}>{children}</h2>;
              case 3:
                return <h3 className={className}>{children}</h3>;
              case 4:
                return <h4 className={className}>{children}</h4>;
              case 5:
                return <h5 className={className}>{children}</h5>;
              default:
                return <h6 className={className}>{children}</h6>;
            }
          },
          list: ({ children, format }) =>
            format === "ordered" ? (
              <ol className="list-decimal pl-6 space-y-3 mb-3">{children}</ol>
            ) : (
              <ul className="list-disc pl-6 space-y-3 mb-3">{children}</ul>
            ),
          "list-item": ({ children }) => <li>{children}</li>,
          link: ({ children, url }) => (
            <a
              href={url}
              className="text-primary font-medium hover:underline"
              target={url?.startsWith("http") ? "_blank" : undefined}
              rel={url?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-4 italic mb-3">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="bg-background rounded-lg p-4 overflow-x-auto mb-3">
              <code>{children}</code>
            </pre>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          strikethrough: ({ children }) => <s>{children}</s>,
          code: ({ children }) => (
            <code className="bg-background px-1.5 py-0.5 rounded text-sm">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
};