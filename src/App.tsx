import { Routes, Route, Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Home } from "./pages/Home";
import { Samples } from "./pages/Samples";
import { News } from "./pages/News";
import { Globe, BarChart3, Newspaper, Code2 } from "lucide-react";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.header`
  background: rgba(30, 30, 50, 0.95);
  color: white;
  padding: 20px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #667eea;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 240px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  overflow-y: auto;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  color: ${props => props.active ? "#ffffff" : "rgba(255, 255, 255, 0.7)"};
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? "600" : "500"};
  border-left: 4px solid ${props => props.active ? "#667eea" : "transparent"};
  background: ${props => props.active ? "rgba(102, 126, 234, 0.3)" : "transparent"};
  margin: 0 10px;
  border-radius: 8px;
  position: relative;

  a {
    display: flex;
    align-items: center;
    gap: inherit;
    color: inherit;
    text-decoration: none;
    width: 100%;
  }

  &:hover {
    color: #ffffff;
    background: rgba(102, 126, 234, 0.25);
    border-left-color: #667eea;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px 0 0 0;
  margin-right: 10px;
  margin-top: 10px;
`;

const Footer = styled.footer`
  background: rgba(30, 30, 50, 0.95);
  color: rgba(255, 255, 255, 0.7);
  padding: 30px 40px;
  text-align: center;
  border-top: 2px solid #667eea;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #764ba2;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavHeader = styled.div`
  padding: 0 20px 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

function Navigation({ active }: { active: string }) {
  return (
    <NavList>
      <NavHeader>Main</NavHeader>
      <NavItem>
        <NavLink active={active === "home"}>
          <Link to="/">
            <Globe size={20} />
            Home
          </Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={active === "samples"}>
          <Link to="/samples">
            <BarChart3 size={20} />
            Samples
          </Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={active === "news"}>
          <Link to="/news">
            <Newspaper size={20} />
            News
          </Link>
        </NavLink>
      </NavItem>
    </NavList>
  );
}

export const App = () => {
  const location = useLocation();

  const getActiveRoute = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname.includes("samples")) return "samples";
    if (location.pathname.includes("news")) return "news";
    return "";
  };

  return (
    <PageContainer>
      <Header>
        <Logo>
          <Globe size={32} />
          GeoLab
        </Logo>
        <FooterLinks>
          <a href="https://github.com/shindeshubham582/GeoLab" target="_blank" rel="noopener noreferrer">
            <Code2 size={24} />
          </a>
        </FooterLinks>
      </Header>

      <MainContent>
        <Sidebar>
          <Navigation active={getActiveRoute()} />
        </Sidebar>

        <ContentArea>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </ContentArea>
      </MainContent>

      <Footer>
        <div>© 2025 GeoLab - Built with React & TypeScript</div>
        <FooterLinks>
          <a href="https://github.com/shindeshubham582" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </FooterLinks>
      </Footer>
    </PageContainer>
  );
}
