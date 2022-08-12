import React, { useEffect } from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { Typography } from "../../components/Typography";
import { Main } from "../../components/Layout";
import ReactMarkdown from "react-markdown";
import { globalStyles } from "../../styles/global";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  base16AteliersulphurpoolLight,
  a11yDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { styled } from "../../styles/stitches.config";
import { sizing, spacing } from "../../styles/utils";
import { Link } from "../../components/Link";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { useTheme } from "../../Contexts/ThemeContext";
import { updateHead } from "../../Contexts/HeadContext";

const frontmatterRegex = /---[\t\n\r\w\s\d:-]*---/gim;

const Article = styled("article", {
  maxWidth: "1024px",
  margin: "0 auto",
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  paddingTop: spacing(4),
  paddingBottom: spacing(4),
  textAlign: "left",
  position: "relative",
});

const Box = styled("div", {
  paddingTop: spacing(2),
  paddingBottom: spacing(2),
});

const Header = styled("header", {
  borderBottom: "1px solid $textColor",
  position: "sticky",
  background: "$backgroundColor",
  top: 0,
  left: 0,
  zIndex: 900,
});

const HeaderInner = styled("div", {
  display: "flex",
  maxWidth: "1024px",
  margin: "0 auto",
  paddingLeft: spacing(2),
  paddingRight: spacing(2),
  gap: spacing(1),
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
});

const ListItem = styled("li", {
  padding: `${spacing(1)} 0`,
  color: "$textColor",
  lineHeight: "$body",
});

export default function Component(props: {
  data: {
    notion: {
      title: string;
      markdownString: string;
      raw: { cover: { external: { url: string } } };
    };
  };
}) {
  globalStyles();
  const body = props.data.notion.markdownString.split(frontmatterRegex);
  const theme = useTheme();
  const update = updateHead();

  useEffect(() => {
    update({ title: props.data.notion.title });
  }, [props]);

  return (
    <Main>
      <Header>
        <HeaderInner>
          <GatsbyLink style={{ textDecoration: "none" }} to="/">
            <Typography variant={"heading1"} as="h1">
              Matt Fowles
            </Typography>
          </GatsbyLink>
          <Typography variant={"heading2"} as="span">
            /
          </Typography>
          <Typography variant={"heading2"} as="h2">
            Writings
          </Typography>
          <ThemeSwitcher />
        </HeaderInner>
      </Header>
      <Article>
        <Box>
          <Typography align="left" variant={"heading1"} as={"h1"}>
            {props.data.notion.title}
          </Typography>
        </Box>
        <ReactMarkdown
          components={{
            h1: ({ children }) => {
              return <Typography variant={"heading1"}>{children}</Typography>;
            },
            h2: ({ children }) => {
              return (
                <Typography variant={"heading2"} as={"h2"}>
                  {children}
                </Typography>
              );
            },
            h3: ({ children }) => {
              return (
                <Typography align="left" variant={"heading3"} as={"h3"}>
                  {children}
                </Typography>
              );
            },
            p: ({ children }) => {
              return (
                <Typography align="left" variant={"body"} as={"p"}>
                  {children}
                </Typography>
              );
            },
            span: ({ children }) => {
              return (
                <Typography variant={"body"} as={"span"} align={"left"}>
                  {children}
                </Typography>
              );
            },
            a: ({ children, href }) => {
              return (
                <Link
                  ariaLabel={children.toString()}
                  href={href || ""}
                  eventLabel={href}
                  inline
                >
                  {children}
                </Link>
              );
            },
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return (
                <SyntaxHighlighter
                  {...props}
                  style={
                    theme === "dark" ? a11yDark : base16AteliersulphurpoolLight
                  }
                  language={match ? match[1] : "text"}
                  showLineNumbers={!inline}
                  customStyle={{
                    maxWidth: "100%",
                    borderRadius: "4px",
                    display: inline ? "inline" : "block",
                    padding: inline ? "1px 4px 2px" : "16px",
                    marginBottom: inline ? 0 : "32px",
                    boxShadow: inline
                      ? "none"
                      : theme === "dark"
                      ? "rgba(149, 157, 165, 0.2) 8px 8px 0px"
                      : "rgba(149, 157, 165, 0.2) 8px 8px 0px",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: `Source code pro, monospace`,
                      letterSpacing: "0.2px",
                      fontWeight: "300",
                      lineHeight: "24px",
                      fontSize: sizing(14),
                    },
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
            li: ({ children }) => {
              return <ListItem>{children}</ListItem>;
            },
          }}
          children={body[1]}
        />
      </Article>
    </Main>
  );
}

// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.
export const query = graphql`
  query ($id: String) {
    notion(id: { eq: $id }) {
      id
      title
      createdAt
      markdownString
      raw {
        cover {
          type
          external {
            url
          }
        }
      }
    }
  }
`;
