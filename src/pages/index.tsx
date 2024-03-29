import React, { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { Link } from "../components/Link";
import { Typography } from "../components/Typography";
import { styled } from "../styles/stitches.config";
import { sizing, spacing } from "../styles/utils";
import { darkTheme } from "../styles/themes/darkTheme";
import { globalStyles } from "../styles/global";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Pill, PillContainer } from "../components/Pill";

globalStyles();

const Main = styled("main", {
  maxWidth: sizing(1024),
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  minHeight: "100vh",
  padding: `0 ${spacing(2)}`,
});

const Container = styled("div", {
  margin: `${spacing(3)} 0`,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
});

const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: `${spacing(4)} ${spacing(2)} ${spacing(2)} ${spacing(2)}`,
});

const Button = styled("button", {
  width: sizing(44),
  height: sizing(44),
  borderRadius: "$round",
  cursor: "pointer",
  marginLeft: spacing(1),
  border: "none",
  background: "$backgroundColor",
  color: "$textColor",
  transition: "none",
});

const ButtonContainer = styled("div", {
  position: "absolute",
  right: spacing(1),
  top: spacing(1),
  display: "flex",
});

const IndexPage = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!window) {
      return;
    }
    const setting = window.localStorage.getItem("theme");
    if (setting) {
      if (setting === "dark") {
        window.document.body.classList.add(darkTheme);
        setTheme("dark");
      }
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        window.document.body.classList.add(darkTheme);
        setTheme("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (!window) {
      return;
    }
    if (window.document.body.classList.contains("dark-theme")) {
      window.document.body.classList.remove("dark-theme");
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      window.document.body.classList.add(darkTheme);
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <>
      <Main>
        <Header>
          <ButtonContainer role="group">
            <Button
              onClick={toggleTheme}
              aria-label="Change theme"
              data-splitbee-event="Change theme"
              data-splitbee-event-theme={theme}
            >
              {theme === "dark" && <MoonIcon width={24} height={24} />}
              {theme === "light" && <SunIcon width={24} height={24} />}
            </Button>
          </ButtonContainer>
          <Avatar />
          <Typography align="center" variant="heading1" as="h1">
            Matt Fowles
          </Typography>
          <Typography align="center" variant="body" as="h3">
            (He / Him, They / Them)
          </Typography>
          <Typography align="center" variant="heading2" as="h2">
            Product Manager & Software Engineer
          </Typography>
          <Typography align="center" variant="heading2" as="h2">
            Digital Nomad, Remote Worldwide <span role="img">󠁧󠁢🌎</span>
          </Typography>
        </Header>
        <PillContainer>
          <Pill>
            <span role="img">🔥</span> Startup UX, UI, DX &amp; Engineering
          </Pill>
          <Pill>
            <span role="img">🌱🔪</span> Plant Based Food
          </Pill>
          <Pill>
            <span role="img">🌳🥾⛰</span> Environment & Nature
          </Pill>
          <Pill>
            <span role="img">📚</span> Polymath, Autodidact & Self Developer
          </Pill>
          <Pill>
            <span role="img">🧳🗺️</span> Traveller, Explorer & Experience Seeker
          </Pill>
          <Pill>
            <span role="img">🗳️🪧</span> Progressive & Egalitarian
          </Pill>
          <Pill>
            <span role="img">🧘☯️☸️</span> Meditation, Spirituality & Buddhism
          </Pill>
          <Pill>
            <span role="img">🎮</span> Platformer & SMW Kaizo
          </Pill>
        </PillContainer>
        <Container>
          <Link
            ariaLabel="email"
            href="mailto:matt@matthewfowles.io"
            eventLabel="Email Link"
          >
            <Typography align="center" variant="link">
              Email
            </Typography>
          </Link>
          {/* <Link
            ariaLabel="C.V"
            href="https://drive.google.com/file/d/1wTm111usGm_NM2cQ6K7EhO9XNLEGJReL/view?usp=sharing"
            eventLabel="C.V Link"
          >
            <Typography align="center" variant="link">
              C.V
            </Typography>
          </Link> */}
          <Link
            ariaLabel="LinkedIn"
            href="https://www.linkedin.com/in/matt-fowles/"
            eventLabel="LinkedIn Link"
          >
            <Typography align="center" variant="link">
              LinkedIn
            </Typography>
          </Link>
          <Link
            ariaLabel="GitHub"
            href="https://github.com/matthewfowles"
            eventLabel="Github Link"
          >
            <Typography align="center" variant="link">
              Github
            </Typography>
          </Link>
          <Link
            ariaLabel="Twitter"
            href="https://twitter.com/matthewfowles"
            eventLabel="Twitter Link"
          >
            <Typography align="center" variant="link">
              Twitter
            </Typography>
          </Link>
          {/* <Link
            ariaLabel="Node package manager"
            href="https://www.npmjs.com/~matthewfowles"
            eventLabel="NPM Link"
          >
            <Typography align="center" variant="link">
              NPM
            </Typography>
          </Link> */}
          <Link
            ariaLabel="Instagram"
            href="https://www.instagram.com/mattfowlesnomad/"
            eventLabel="Instagram Link"
          >
            <Typography align="center" variant="link">
              Instagram
            </Typography>
          </Link>
          <Link
            ariaLabel="Goodreads"
            href="https://www.goodreads.com/user/show/73524230-matt-fowles"
            eventLabel="Goodreads Link"
          >
            <Typography align="center" variant="link">
              Goodreads
            </Typography>
          </Link>
          <Link
            ariaLabel="Spotify"
            href="https://open.spotify.com/user/11124824682?si=428ab6e5baa948a5"
            eventLabel="Spotify Link"
          >
            <Typography align="center" variant="link">
              Spotify
            </Typography>
          </Link>
        </Container>
      </Main>
    </>
  );
};

export default IndexPage;
