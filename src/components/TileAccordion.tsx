import React from "react";
import styled from "@emotion/styled";
import { NewsArticle } from "../services/newsApi";

interface AccordionProps {
  defaultOpen?: boolean;
  data: NewsArticle;
  setOpenArticleId: (id: string | null) => void;
}

const FALLBACK_IMAGE_URL = "data:image/png;base64,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";

const AccordionWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  // background-color: #f9f9f9;
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const HeaderContainer = styled.div`
  margin: 14px 16px;
  isplay: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

`;

const Arrow = styled.span<{ isOpen: boolean }>`
  display: inline-block;
  font-size: 14px;
  transition: transform 0.3s ease;
  transform: rotate(${props => (props.isOpen ? "90deg" : "0deg")});
`;

const Content = styled.div<{ isOpen: boolean }>`
  max-height: ${props => (props.isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.35s ease;
`;

const Body = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Description = styled.p`
  font-size: 14px;
  max-height: 250px;
  overflow: scroll;
  
  &:hover {ßß
  border: 1px solid #ddd;
  }
  `

const Image = styled.img`
  max-width: 300px;
  max-height: 300px;
  display: block;
  objectFit: contain;
  borderRadius: 8px;
  margin: 0 auto;`;

const Footer = styled.footer`
  margin-top: 12px;
  font-size: 12px;
  color: #666;

  & p {
  margin: 0;
  }
`;


export const TileAccordion = ({
  data,
  defaultOpen = false,
  setOpenArticleId
}: AccordionProps) => {

  const toggleAccordion = () => {
    setOpenArticleId(defaultOpen ? null : data.article_id);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = FALLBACK_IMAGE_URL;
  };

  return <AccordionWrapper>
      {!defaultOpen && <HeaderContainer>
      <Header onClick={toggleAccordion}>
        <Title>{data.title}</Title>
        <Arrow isOpen={defaultOpen}>▶</Arrow>
      </Header>
      <p><small>Publbished on: {new Date(data.pubDate).toLocaleDateString()} | Language: {data.language} | Publisher: {data.source_name}</small></p>
      </HeaderContainer>}

      {defaultOpen && <Content isOpen={defaultOpen}>
      <Header onClick={toggleAccordion}>
        <Title>{data.title}</Title>
        <Arrow isOpen={defaultOpen}>▶</Arrow>
      </Header>
      <Body>
      <Image src={data.image_url ? data.image_url : FALLBACK_IMAGE_URL} alt={data.title} onError={handleImageError}/>
      <Description>{data.description}</Description>
      <Footer>
        <p>Publbished on: {new Date(data.pubDate).toLocaleDateString()} | Language: {data.language} | Publisher: {data.source_name}</p>
        <p><a href={data.link} target={data.link} rel="noopener noreferrer">See full article</a></p>
      </Footer>
      </Body>
      </Content>}
    </AccordionWrapper>
};
