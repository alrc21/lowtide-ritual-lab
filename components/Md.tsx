import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Md({ children }: { children: string }) {
  return (
    <div className="prose prose-lowtide max-w-none prose-sm sm:prose-base prose-headings:font-display prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-6 sm:prose-h1:mb-8 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 sm:prose-h2:mt-14 prose-h2:mb-4 sm:prose-h2:mb-5 prose-h3:text-base sm:prose-h3:text-lg prose-h3:tracking-wide prose-p:leading-[1.7] sm:prose-p:leading-[1.75] prose-li:leading-[1.7] sm:prose-li:leading-[1.75] prose-table:text-xs sm:prose-table:text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
