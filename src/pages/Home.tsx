import styled from "@emotion/styled";
import { ArrowRight, BarChart3, Newspaper, Download, Zap, Code, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 20px;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
  }

  svg {
    color: #667eea;
    margin-bottom: 15px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const FeatureDesc = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 14px;
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 50px;
  border-radius: 20px;
  color: white;
  margin-bottom: 60px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  text-align: center;

  .stat-number {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .stat-label {
    font-size: 14px;
    opacity: 0.9;
  }
`;

const TechStack = styled.section`
  margin-top: 60px;

  h2 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const TechBadge = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  color: #667eea;
  border: 1px solid #667eea;
`;

export const Home = () => {
  return (
    <Container>
      <Hero>
        <Title>Welcome to GeoLab</Title>
        <Subtitle>
          A modern platform for geospatial data analysis, environmental news tracking, and sample data processing
        </Subtitle>
        <ButtonGroup>
          <Button to="/samples">
            Get Started <BarChart3 size={20} />
          </Button>
          <Button to="/news">
            Read News <Newspaper size={20} />
          </Button>
        </ButtonGroup>
      </Hero>

      <FeaturesGrid>
        <FeatureCard>
          <BarChart3 size={32} />
          <FeatureTitle>Sample Analysis</FeatureTitle>
          <FeatureDesc>
            Upload CSV files with sample data, perform automated calculations, and visualize results with interactive charts and analytics.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <Newspaper size={32} />
          <FeatureTitle>News Feed</FeatureTitle>
          <FeatureDesc>
            Stay informed with real-time environmental, science, and technology news. Filter by country and search with intelligent debouncing.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <Download size={32} />
          <FeatureTitle>Export Data</FeatureTitle>
          <FeatureDesc>
            Export your processed data to CSV or PDF formats. Create professional reports with charts, summaries, and detailed analytics.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <Database size={32} />
          <FeatureTitle>Data Persistence</FeatureTitle>
          <FeatureDesc>
            Automatically save your data locally. Never lose your work with intelligent browser storage management.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <Zap size={32} />
          <FeatureTitle>High Performance</FeatureTitle>
          <FeatureDesc>
            Built with React and TypeScript for lightning-fast interactions. Optimized bundle size for quick loading.
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <Code size={32} />
          <FeatureTitle>Clean Code</FeatureTitle>
          <FeatureDesc>
            Open-source with TypeScript, comprehensive testing, and well-documented API. Easy to extend and maintain.
          </FeatureDesc>
        </FeatureCard>
      </FeaturesGrid>

      <StatsSection>
        <h2 style={{ color: "white", marginBottom: "40px" }}>Platform Highlights</h2>
        <StatsGrid>
          <StatCard>
            <div className="stat-number">10+</div>
            <div className="stat-label">Real-time News Sources</div>
          </StatCard>
          <StatCard>
            <div className="stat-number">50+</div>
            <div className="stat-label">Automatic Calculations</div>
          </StatCard>
          <StatCard>
            <div className="stat-number">100%</div>
            <div className="stat-label">Data Accuracy</div>
          </StatCard>
          <StatCard>
            <div className="stat-number">3</div>
            <div className="stat-label">Export Formats</div>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <TechStack>
        <h2>Built With Modern Technologies</h2>
        <TechGrid>
          <TechBadge>React 19</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Material UI</TechBadge>
          <TechBadge>Emotion CSS</TechBadge>
          <TechBadge>React Query</TechBadge>
          <TechBadge>Recharts</TechBadge>
          <TechBadge>Webpack 5</TechBadge>
          <TechBadge>Jest Testing</TechBadge>
          <TechBadge>GitHub Actions</TechBadge>
        </TechGrid>
      </TechStack>
    </Container>
  );
};