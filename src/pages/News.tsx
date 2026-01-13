import { useState } from "react"
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { TileAccordion } from "../components/TileAccordion";

import { useDebounce } from "../components/useDebounce";

import { fetchNews } from "../services/newsApi";

const Container = styled.div`
    display: flex;
    gap: 5px;
`;

const InputBox = styled.input`
    padding: 5px;
    width: 100px;
    height: 10px;
    align-self: center;
`;

const Select = styled.select`
    width: 150px;
    height: 35px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    align-self: center;
    padding: 5px;

    &:focus {
        outline: none;
    }`;

const Option = styled.option`
    width: 100px;
    height: 20px;
    align-self: center;
    background-color: white;
    color: black;`;

const NewsContainer = styled.div`
    min-height: 400px;
    margin-top: 20px;
    width: 600px;
    padding:10px;
    border: 3px solid #ccc;`;


export const News = () => {
    const [country, setCountry] = useState('in');
    const [searchQuery, setSearchQuery] = useState('');
    const [openArticleId, setOpenArticleId] = useState<string | null>(null);

    const debouncedSearch = useDebounce(searchQuery, 500);

    const onSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const { data = [], isLoading, error } = useQuery({
        queryKey: ["news", country, debouncedSearch],
        queryFn: () => fetchNews(country, debouncedSearch),
        enabled: debouncedSearch.trim().length > 0,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 2,
    });

    return <div>
        <h2>Geo News</h2>
        <Container>
            <p>Search text: </p>
            <InputBox placeholder="Enter Text..."
            value={searchQuery}
            onChange={onSearchQueryChange}/>
        </Container>

        <Container>
            <p>Selecrt Country: </p>
        <Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <Option value="in">India</Option>
          <Option value="us">USA</Option>
          <Option value="gb">UK</Option>
          <Option value="fr">France</Option>
        </Select>
        </Container>

        <NewsContainer>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching news</p>}
            {searchQuery.length === 0 && <>Please enter something in search.</>}
            {data.length === 0 && searchQuery.length !== 0 && !isLoading && !error && <p>No news articles found.</p>}
            {searchQuery.length !== 0 && data.length && data.map((article) => {
                return <TileAccordion key={article.article_id}
                defaultOpen={article.article_id === openArticleId}
                data={article}
                setOpenArticleId={(id: null | string) => {setOpenArticleId(id)}}/>
            }
            )}
        </NewsContainer>
    </div>
}