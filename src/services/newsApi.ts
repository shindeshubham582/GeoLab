const API_KEY = "pub_b2566f2a106a4a24a01f158be8311c65";

export interface NewsArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source_id: string;
  article_id: string;
  language: string;
  source_name: string;
  image_url: string;
}

export const fetchNews = async (
  country: string,
  queryText: string
): Promise<NewsArticle[]> => {
  const url = new URL("https://newsdata.io/api/1/news");

  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("country", country);
  url.searchParams.append("q", queryText);
  url.searchParams.append("category", "environment,science,technology");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Something went wrong. Please try again later.");
  }

  const data = await response.json();
  return data?.results?.slice(0, 10) ?? [];
};
