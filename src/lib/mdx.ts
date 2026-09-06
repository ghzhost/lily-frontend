 import fs from "fs/promises";
 import path from "path";
 import matter from "gray-matter";

 export interface MdxDocument {
   slug: string;
   title: string;
   date?: string;
   content: string;
   excerpt?: string;
 }

 const CONTENT_DIR = path.join(process.cwd(), "content");

 export async function getMdxBySlug(slug: string): Promise<MdxDocument | null> {
   try {
     const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
     const raw = await fs.readFile(filePath, "utf-8");
     const { data, content } = matter(raw);

     return {
      slug,
      title: String(data.title ?? slug),
      ...(data.date ? { date: String(data.date) } : {}),
      ...(data.excerpt ? { excerpt: String(data.excerpt) } : {}),
      content,
    };
   } catch {
     return null;
   }
 }

 export async function listMdxDocuments(): Promise<MdxDocument[]> {
   try {
     const files = await fs.readdir(CONTENT_DIR);
     const docs: MdxDocument[] = [];

     for (const file of files) {
       if (!file.endsWith(".mdx")) continue;
       const slug = file.replace(/\.mdx$/, "");
       const doc = await getMdxBySlug(slug);
       if (doc) docs.push(doc);
     }

     return docs.sort((a, b) => (b.date && a.date ? b.date.localeCompare(a.date) : 0));
   } catch {
     return [];
   }
 }
