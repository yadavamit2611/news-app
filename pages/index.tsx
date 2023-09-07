import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import process from 'process'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import {Alert} from "react-bootstrap"

const inter = Inter({ subsets: ['latin'] })

interface BreakingNewsPageProps{
  newsArticles: NewsArticle[], 
}
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  await new Promise(r => setTimeout(r,3000));
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {newsArticles: newsResponse.articles}
  }
}

export default function BreakingNewsPage({newsArticles}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - NextJS News App</title>
      </Head>
      <main>
        <Alert>This page use <strong>getServerSideProps</ strong> to fetch data server-side on every request. this allows search engines to crawl the page content and <strong>improves SEO</strong></Alert>
        <h1>Breaking News</h1>
        <NewsArticlesGrid articles={newsArticles}/>
      </main>
    </>
  )
}
