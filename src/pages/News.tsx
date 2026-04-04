import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, CircularProgress, Chip, Grid, Box, TextField } from "@mui/material";
import { ExternalLink, Flame, Calendar } from "lucide-react";

import { useDebounce } from "../components/useDebounce";
import { fetchNews, NewsArticle } from "../services/newsApi";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;

  h1 {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

const ControlsSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const NewsContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsDescription = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const NewsMetadata = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #888;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const SourceBadge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  width: fit-content;
`;

const ReadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const LoadingCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
`;

const PlaceholderContainer = styled.div`
  background: white;
  padding: 40px 20px;
  border-radius: 12px;
  text-align: center;
  color: #999;

  h3 {
    color: #666;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
  }
`;

const TrendingSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  color: white;

  h2 {
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
  }
`;

const TrendingTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TrendingTag = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &.active {
    background: white;
    color: #667eea;
  }
`;

const TRENDING_SEARCHES = [
  "Climate Change",
  "Renewable Energy",
  "Environmental Pollution",
  "Biodiversity",
  "Climate Science",
  "Green Technology",
];

const COUNTRIES = [
  { code: "in", name: "🇮🇳 India" },
  { code: "us", name: "🇺🇸 USA" },
  { code: "gb", name: "🇬🇧 UK" },
  { code: "ca", name: "🇨🇦 Canada" },
  { code: "au", name: "🇦🇺 Australia" },
  { code: "de", name: "🇩🇪 Germany" },
];

export const News = () => {
  const [country, setCountry] = useState("in");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["news", country, debouncedSearch],
    queryFn: () => fetchNews(country, debouncedSearch || "environment"),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const trendingArticles = useMemo(
    () => data.slice(0, 3),
    [data]
  );

  const handleTrendingClick = (tag: string) => {
    setSearchQuery(tag);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const openArticle = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <Header>
        <h1>Environmental News Feed</h1>
        <p>Stay updated with the latest news on environment, science, and technology</p>
      </Header>

      <ControlsSection>
        <TextField
          placeholder="Search news (e.g., climate, energy, pollution)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          select
          SelectProps={{ native: true }}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          size="small"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </TextField>
      </ControlsSection>

      {trendingArticles.length > 0 && (
        <TrendingSection>
          <h2>
            <Flame size={20} />
            Trending Now
          </h2>
          <TrendingTags>
            {TRENDING_SEARCHES.map((tag) => (
              <TrendingTag
                key={tag}
                className={searchQuery === tag ? "active" : ""}
                onClick={() => handleTrendingClick(tag)}
              >
                {tag}
              </TrendingTag>
            ))}
          </TrendingTags>
        </TrendingSection>
      )}

      {error && (
        <PlaceholderContainer>
          <h3>⚠️ Error Loading News</h3>
          <p>Unable to fetch news articles. Please try again later.</p>
        </PlaceholderContainer>
      )}

      {isLoading ? (
        <LoadingContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LoadingCard key={i}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Box p={2}>
                <Skeleton />
                <Skeleton width="80%" />
                <Skeleton />
              </Box>
            </LoadingCard>
          ))}
        </LoadingContainer>
      ) : data.length === 0 ? (
        <PlaceholderContainer>
          <h3>📰 No Articles Found</h3>
          <p>Try searching with different keywords or select another country</p>
        </PlaceholderContainer>
      ) : (
        <>
          <NewsGrid>
            {data.map((article: NewsArticle) => (
              <NewsCard key={article.article_id}>
                <NewsImage
                  src={article.image_url || "https://via.placeholder.com/320x200?text=No+Image"}
                  alt={article.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/320x200?text=No+Image";
                  }}
                />
                <NewsContent>
                  <SourceBadge>{article.source_name || "News"}</SourceBadge>
                  <NewsTitle>{article.title}</NewsTitle>
                  <NewsDescription>{article.description}</NewsDescription>
                  <NewsMetadata style={{ marginTop: "auto" }}>
                    <MetaRow>
                      <Calendar size={14} />
                      <span>{formatDate(article.pubDate)}</span>
                    </MetaRow>
                    <ReadButton
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openArticle(article.link);
                      }}
                    >
                      Read Article
                      <ExternalLink size={12} />
                    </ReadButton>
                  </NewsMetadata>
                </NewsContent>
              </NewsCard>
            ))}
          </NewsGrid>

          <Box textAlign="center" py={3} color="#999">
            Showing {data.length} articles | Last updated: {new Date().toLocaleTimeString()}
          </Box>
        </>
      )}
    </Container>
  );
};