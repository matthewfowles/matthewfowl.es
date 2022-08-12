import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Helmet } from "react-helmet";

type Head = {
  title?: string;
  description?: string;
  author?: string;
  og?: {
    url?: string;
    type?: string;
    title?: string;
    image?: string;
    description?: string;
    site_name?: string;
    locale?: string;
  };
  twitter?: {
    site?: string;
    creator?: string;
    url?: string;
    title?: string;
    description?: string;
    image?: string;
  };
};

const defaultValues = {
  title: "Matt Fowles",
  description: "",
  author: "",
  og: {
    url: "https://mattfowl.es",
    type: "website",
    title: "Matt Fowles",
    image: "https://mattfowl.es/assets/apple-touch-icon-1024x1024.png",
    description: "Matt Fowles",
    site_name: "",
    locale: "en_US",
  },
  twitter: {
    site: "@matthewfowles",
    creator: "@matthewfowles",
    url: "https://mattfowl.es",
    title: "Matt Fowles",
    description: "Matt Fowles",
    image: "https://mattfowl.es/assets/apple-touch-icon-1024x1024.png",
  },
};

export const HeadContext = createContext<{
  data: Head;
  update: (values: Head) => void;
}>({ data: defaultValues, update: () => null });

export default function HeadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState(defaultValues);

  const values = useMemo(() => {
    return {
      data,
      update: ({ twitter, og, ...rest }: Head) =>
        setData({
          ...data,
          twitter: {
            ...data.twitter,
            ...twitter,
          },
          og: {
            ...data.og,
            ...og,
          },
          ...rest,
        }),
    };
  }, [data]);

  return (
    <HeadContext.Provider value={values}>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="author" content={data.author} />
        <meta property="og:url" content={data.og.url} />
        <meta property="og:type" content={data.og.type} />
        <meta property="og:title" content={data.og.title} />
        <meta property="og:image" content={data.og.image} />
        <meta property="og:description" content={data.og.description} />
        <meta property="og:site_name" content={data.og.site_name} />
        <meta property="og:locale" content={data.og.locale} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={data.twitter.site} />
        <meta name="twitter:creator" content={data.twitter.creator} />
        <meta name="twitter:url" content={data.twitter.url} />
        <meta name="twitter:title" content={data.twitter.title} />
        <meta name="twitter:description" content={data.twitter.description} />
        <meta name="twitter:image" content={data.twitter.image} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Helmet>
      {children}
    </HeadContext.Provider>
  );
}

export function useHead(): Head {
  const context = useContext(HeadContext);
  return context.data;
}

export function updateHead() {
  const context = useContext(HeadContext);
  return context.update;
}
