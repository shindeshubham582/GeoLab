import styled from "@emotion/styled";
import { BarChart3, Newspaper, Download, Zap, Code, Database, ExternalLink } from "lucide-react";
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

const ProjectsSection = styled.section`
  margin: 60px 0;

  h2 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
`;

const ProjectCard = styled.a`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2);

    .project-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  }
`;

const ProjectHeader = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  min-height: 80px;

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  svg {
    color: #667eea;
    flex-shrink: 0;
  }
`;

const ProjectBody = styled.div`
  padding: 20px 30px 30px;
  flex: 1;
  display: flex;
  flex-direction: column;

  p {
    color: #666;
    line-height: 1.6;
    margin: 0 0 15px 0;
    font-size: 14px;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;

    span {
      display: inline-block;
      background: #f0f0f0;
      color: #667eea;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
  }
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

      <ProjectsSection>
        <h2>Featured Projects</h2>
        <ProjectGrid>
          <ProjectCard href="/" title="GeoLab - Geospatial Analysis Platform">
            <ProjectHeader as="div" className="project-header">
              <h3>GeoLab</h3>
              <ExternalLink size={24} />
            </ProjectHeader>
            <ProjectBody>
              <p>
                A professional platform for geospatial data analysis with CSV processing, real-time environmental news tracking, and interactive data visualizations.
              </p>
              <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>Recharts</span>
                <span>Material-UI</span>
              </div>
            </ProjectBody>
          </ProjectCard>

          <ProjectCard
            href="https://shindeshubham582.github.io/React_Profile_search/"
            target="_blank"
            rel="noopener noreferrer"
            title="React Profile Search - GitHub User Search"
          >
            <ProjectHeader as="div" className="project-header">
              <h3>Profile Search</h3>
              <ExternalLink size={24} />
            </ProjectHeader>
            <ProjectBody>
              <p>
                A React application for searching and exploring GitHub user profiles. View user repositories, follow statistics, and detailed account information with a modern UI.
              </p>
              <div className="project-tech">
                <span>React</span>
                <span>GitHub API</span>
                <span>Responsive Design</span>
                <span>Search</span>
              </div>
            </ProjectBody>
          </ProjectCard>
        </ProjectGrid>
      </ProjectsSection>

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