"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  heading: string;
  description: string;
  productimage: string;
  applicationtype: string[];
}

interface Blog {
  _id: string;
  heading: string;
  description: string;
  blogimg: string;
  date: string;
  blogtype: string[];
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, blogRes] = await Promise.all([
          axios.get("/api/product/productlist"),
          axios.get("/api/blog/bloglist"),
        ]);
        setProducts(prodRes.data.data || []);
        setBlogs(blogRes.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const stripHtml = (html: string, limit = 18) => {
    const text = html?.replace(/<[^>]*>?/gm, "") || "";
    const words = text.trim().split(/\s+/);
    return words.slice(0, limit).join(" ") + (words.length > limit ? "…" : "");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] dark:bg-[#0f1117] px-4 py-8 md:px-8">
      {/* ══════════════ PRODUCTS SECTION ══════════════ */}
      <section className="mb-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="block w-1 h-7 rounded-full bg-indigo-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              Recent Products
            </h2>
            <span className="ml-1 text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 px-2 py-0.5 rounded-full font-semibold">
              {products.length - 3}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/product/productlist/addpage"
              className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-indigo-200 dark:hover:shadow-indigo-900"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Product
            </Link>
            <Link
              href="/dashboard/product/productlist"
              className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.slice(3, 11).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              stripHtml={stripHtml}
            />
          ))}
        </div>
      </section>

      {/* ══════════════ BLOGS SECTION ══════════════ */}
      <section>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="block w-1 h-7 rounded-full bg-rose-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              Recent Blogs
            </h2>
            <span className="ml-1 text-xs bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300 px-2 py-0.5 rounded-full font-semibold">
              {blogs.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/blog/bloglist/addpage"
              className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-rose-200 dark:hover:shadow-rose-900"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Blog
            </Link>
            <Link
              href="/dashboard/blog/bloglist"
              className="text-xs font-semibold text-rose-500 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Blog Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.slice(0, 6).map((blog) => (
            <BlogCard key={blog._id} blog={blog} stripHtml={stripHtml} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({
  product,
  stripHtml,
}: {
  product: Product;
  stripHtml: (html: string, limit?: number) => string;
}) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {product.productimage ? (
          <Image
            src={product.productimage}
            alt={product.heading}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-4xl">
            📦
          </div>
        )}
        {product.applicationtype && (
          <span className="absolute top-2 left-2 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {product.applicationtype.slice(0, 1).map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {product.heading}
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {stripHtml(product.description)}
        </p>
      </div>
    </div>
  );
}

/* ─── Blog Card ─── */
function BlogCard({
  blog,
  stripHtml,
}: {
  blog: Blog;
  stripHtml: (html: string, limit?: number) => string;
}) {
  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {blog.blogimg ? (
          <Image
            src={blog.blogimg}
            alt={blog.heading}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-4xl">
            ✍️
          </div>
        )}
        {/* Date badge */}
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
          {formattedDate}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Blog type tags */}
        {blog.blogtype?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {blog.blogtype.slice(0, 2).map((type, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold bg-rose-50 text-rose-500 dark:bg-rose-900/30 dark:text-rose-300 px-2 py-0.5 rounded-full uppercase tracking-wide"
              >
                {type}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {blog.heading}
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {stripHtml(blog.description)}
        </p>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({
  icon,
  message,
  href,
  label,
}: {
  icon: string;
  message: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
      <span className="text-5xl mb-3">{icon}</span>
      <p className="text-gray-400 text-sm mb-4">{message}</p>
      <Link
        href={href}
        className="text-xs font-semibold bg-gray-800 text-white dark:bg-white dark:text-gray-900 px-4 py-2 rounded-xl hover:opacity-80 transition-all"
      >
        {label}
      </Link>
    </div>
  );
}
