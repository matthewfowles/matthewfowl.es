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
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Main } from "../components/Layout";

globalStyles();

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
  padding: `${spacing(4)} ${spacing(2)} 0 ${spacing(2)}`,
});

const IndexPage = () => {
  return (
    <>
      <Main>
        <Header>
          <ThemeSwitcher />
          <Avatar />
          <Typography align="center" variant="heading1" as="h1">
            Matt Fowles
          </Typography>
          <Typography align="center" variant="heading2" as="h2">
            Autodidactic Polymath
          </Typography>
        </Header>
        <PillContainer>
          <Pill>
            Software Engineer <span role="img">🧑‍🔧</span>
          </Pill>
          <Pill>
            Manager &amp; Coach <span role="img">👨‍🏫</span>
          </Pill>
          <Pill>
            Coder <span role="img">💻</span>
          </Pill>
          <Pill>
            Startup UI &amp; Engineering <span role="img">🔥</span>
          </Pill>
          <Pill>
            Dog partner <span role="img">🐕</span>
          </Pill>
          <Pill>
            Plant Based <span role="img">🌱</span>
          </Pill>
          <Pill>
            Cook <span role="img">🔪</span>
          </Pill>
          <Pill>
            Hiker <span role="img">🥾</span>
          </Pill>
          <Pill>
            Nature lover <span role="img">⛺</span>
          </Pill>
          <Pill>
            Platformer <span role="img">🎮</span>
          </Pill>
        </PillContainer>
        <Typography align="center" variant="heading2" as="h2">
          Busy, but always open to oppurtunities, lets talk (until 2023)
        </Typography>
        <Typography align="center" variant="heading2" as="h2">
          Remote U.K - Hanging out around Edinburgh <span role="img">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
          <span role="img">🍻</span>
        </Typography>
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
          <Link
            ariaLabel="C.V"
            href="https://drive.google.com/file/d/1wTm111usGm_NM2cQ6K7EhO9XNLEGJReL/view?usp=sharing"
            eventLabel="C.V Link"
          >
            <Typography align="center" variant="link">
              C.V
            </Typography>
          </Link>
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
          <Link
            ariaLabel="Node package manager"
            href="https://www.npmjs.com/~matthewfowles"
            eventLabel="NPM Link"
          >
            <Typography align="center" variant="link">
              NPM
            </Typography>
          </Link>
          <Link
            ariaLabel="Instagram"
            href="https://www.instagram.com/matthewfowles/"
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
