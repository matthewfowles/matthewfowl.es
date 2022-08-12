import React, { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import { CSS } from "@stitches/react";
import { styled } from "../../styles/stitches.config";

const ImageElement = styled("img");

const Image = ({
  src,
  css,
  ...rest
}: {
  src: string;
  role: string;
  alt: string;
  css?: CSS;
}) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(
        filter: { internal: { mediaType: { regex: "/image/" } } }
      ) {
        edges {
          node {
            relativePath
            extension
            publicURL
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
      notion: allNotion {
        edges {
          node {
            raw {
              cover {
                external {
                  url
                }
                type
              }
            }
          }
        }
      }
    }
  `);

  const match = useMemo(
    () =>
      data.images.edges.find(
        ({ node }: { node: { relativePath: string } }) =>
          src === node.relativePath
      ) ||
      data.notion.edges.find(
        ({
          node,
        }: {
          node: { raw: { cover: { external: { url: string } } } };
        }) => src === node.raw.cover.external.url
      ),
    [data, src]
  );

  if (!match) return null;

  const {
    node: { childImageSharp, publicURL, extension } = {},
  }: {
    node: {
      publicURL?: string;
      extension?: string;
      childImageSharp?: { fluid: any };
    };
  } = match;

  if (extension === "svg" || !childImageSharp) {
    return (
      <ImageElement
        css={css}
        src={publicURL || match?.node?.raw?.cover?.external?.url}
        {...rest}
      />
    );
  }

  return <Img loading="eager" fluid={childImageSharp.fluid} {...rest} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Image;
