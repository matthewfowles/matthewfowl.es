import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          httpEquiv="x-ua-compatible"
          content="ie=edge"
          className="dark-theme"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Matt Fowles</title>
        <meta name="description" content="Matt Fowles" />
        <meta name="author" content="Matt Fowles" />
        <meta property="og:url" content="https://mattfowl.es" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Matt Fowles" />
        <meta
          property="og:image"
          content="https://mattfowl.es/assets/apple-touch-icon-1024x1024.png"
        />
        <meta property="og:description" content="Software Engineer" />
        <meta property="og:site_name" content="Matt Fowles" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@mtthewfowles" />
        <meta name="twitter:creator" content="@matthewfowles" />
        <meta name="twitter:url" content="https://mattfowl.es" />
        <meta name="twitter:title" content="Matt Fowles" />
        <meta name="twitter:description" content="Software Engineer" />
        <meta
          name="twitter:image"
          content="https://mattfowl.es/assets/apple-touch-icon-1024x1024.png"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
