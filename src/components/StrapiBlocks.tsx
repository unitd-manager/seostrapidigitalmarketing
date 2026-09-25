import type { ReactNode } from "react";
import type { RichText, StrapiBlockChild } from "@/types/case-study";

/**
 * Minimal renderer for Strapi's Blocks rich-text field (paragraph, heading,
 * list, link, and bold/italic/underline/code marks). If you need footnotes,
 * images, or quotes inside rich text, swap this for the official
 * `@strapi/blocks-react-renderer` package instead.
 */
function renderChildren(children: StrapiBlockChild[]): ReactNode {
  return children.map((child, i) => {
    if (child.type === "link" && child.children) {
      return (
        <a key={i} href={child.url} className="text-primary underline">
          {renderChildren(child.children)}
        </a>
      );
    }
    let node: ReactNode = child.text;
    if (child.bold) node = <strong key={i}>{node}</strong>;
    if (child.italic) node = <em key={i}>{node}</em>;
    if (child.underline) node = <u key={i}>{node}</u>;
    if (child.code) node = <code key={i}>{node}</code>;
    return <span key={i}>{node}</span>;
  });
}

/** Flattens Blocks (or a plain string) down to plain text — handy for card previews. */
export function richTextToPlain(content: RichText | undefined): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  return content
    .map((block) =>
      block.children
        .map((c) => c.text ?? (c.children ? c.children.map((cc) => cc.text ?? "").join("") : ""))
        .join("")
    )
    .join(" ");
}

export default function StrapiBlocks({
  content,
  className,
}: {
  content: RichText | undefined;
  className?: string;
}) {
  if (!content) return null;
if (typeof content === "string") {
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className={`${className ?? ""} mb-4 last:mb-0`}>
          {para}
        </p>
      ))}
    </>
  );
}

  return (
    <>
      {content.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const level = block.level && block.level >= 1 && block.level <= 6 ? block.level : 3;
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <Tag key={i} className="font-bold text-white mb-3">
                {renderChildren(block.children)}
              </Tag>
            );
          }
          case "list": {
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={i} className="list-disc list-inside mb-4 space-y-1">
                {block.children.map((item, j) => (
                  <li key={j}>{item.children ? renderChildren(item.children) : item.text}</li>
                ))}
              </ListTag>
            );
          }
          case "paragraph":
          default:
            return (
              <p key={i} className={className}>
                {renderChildren(block.children)}
              </p>
            );
        }
      })}
    </>
  );
}