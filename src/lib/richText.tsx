import type { ReactNode } from "react";

/*
 * Parse inline markdown within a single line of text:
 * - **bold** -> <strong>
 * - [label](url) -> <a href={url}>
 *
 * This lets Strapi rich text like:
 *   **Email:** [admin@x.com](mailto:admin@x.com)
 * render as an actual bold label + clickable link,
 * instead of showing the raw markdown characters.
 */
export const parseInline = (text: string): ReactNode[] => {
  // Matches **bold** OR [label](url), in order of appearance
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      // **bold**
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      // [label](url)
      const label = match[2];
      const url = match[3];

      nodes.push(
        <a
          key={key++}
          href={url}
          className="text-primary font-medium hover:underline"
          target={url.startsWith("http") ? "_blank" : undefined}
          rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

/*
 * Render a full Strapi markdown description block:
 * - Normal lines -> paragraphs (with inline parsing)
 * - Lines starting with "- ", "* ", or "• " -> a bullet list
 */
export const renderDescription = (description?: string) => {
  if (!description) return null;

  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // Requires a space after the marker so "**Email:**" (bold) is never
  // mistaken for a bullet starting with "*".
  const bulletMarker = /^[-*•]\s+/;

  const bulletLines = lines.filter((line) => bulletMarker.test(line));
  const normalLines = lines.filter((line) => !bulletMarker.test(line));

  return (
    <div className="text-lg text-muted-foreground leading-relaxed">
      {normalLines.map((line, index) => (
        <p key={index} className="mb-3 last:mb-0">
          {parseInline(line)}
        </p>
      ))}

      {bulletLines.length > 0 && (
        <ul className="list-disc pl-6 space-y-3">
          {bulletLines.map((line, index) => (
            <li key={index}>
              {parseInline(line.replace(bulletMarker, ""))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};