import { Md } from "@/components/Md";
import { Nav } from "@/components/Nav";
import { getStrategy } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const docs = await getStrategy();
  return docs.map((d) => ({ slug: d.slug }));
}

export default async function StrategyDoc({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const docs = await getStrategy();
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <main>
      <Nav />
      <article className="px-5 sm:px-8 md:px-16 lg:px-24 py-14 sm:py-20 max-w-4xl">
        <Link
          href={{ pathname: "/" }}
          className="label text-muted hover:text-terracotta transition-colors duration-300 mb-8 sm:mb-10 inline-block"
        >
          ← Back to canvas
        </Link>
        <div className="label text-muted mb-3 sm:mb-4">{doc.words.toLocaleString()} words · Español</div>
        <h1 className="display text-3xl sm:text-4xl md:text-5xl mb-10 sm:mb-12 max-w-3xl leading-[1.05]">{doc.title}</h1>
        <Md>{doc.body}</Md>
      </article>
    </main>
  );
}
