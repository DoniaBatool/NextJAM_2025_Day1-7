"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/fetch";

const tagsQuery = `
*[_type == "product"].tags[]
`;

const FooterTags = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags: string[] = await sanityFetch({ query: tagsQuery });
      const uniqueTags = Array.from(new Set(fetchedTags)); // Remove duplicates
      setTags(uniqueTags);
    };

    fetchTags();
  }, []);

  if (tags.length === 0) {
    return <p>Loading tags...</p>; // Show a loading state
  }

  return (
    <ul className="flex flex-col gap-2">
         <p className="font-clash text-[16px]">
                  Categories
                </p>
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/tags/${encodeURIComponent(tag)}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterTags;
