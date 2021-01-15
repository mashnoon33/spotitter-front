import React from "react";
import data from "./projects";
import { render } from "react-dom";
import { Project } from "./projectModel";
import { UserModel } from "./userModel";
import { SpotifyApiContext, Track, User } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import "react-spotify-auth/dist/index.css"; // if using the included styles
import { QueryClient, QueryClientProvider } from "react-query";

import {
  Box,
  Image,
  Grommet,
  Text,
  Paragraph,
  ResponsiveContext,
  Card,
  CardHeader,
  TextInput,
  Keyboard,
} from "grommet";


const queryClient = new QueryClient();

const theme = {
  global: {
    // edgeSize: {
    // 	xxlarge: "230px",
    // },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
      color: "white",
    },
    colors: {
      brand: "#f0be72",
      border: {
        dark: "rgba(255,255,255,0.07)",
        light: "rgba(0,0,0,0.07)",
      },
    },
  },

  paragraph: {
    xxlarge: {
      size: "18px",
      height: "24px",
      maxWidth: "899px",
    },
  },

  components: {
    p: {
      component: "Paragraph",
      props: { size: "18px" },
    },
  },
  text: {
    xlarge: {
      size: "90px",
      height: "90px",
    },
    xxlarge: {
      size: "110px",
      height: "110px",
      maxWidth: "816px",
    },
  },
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Projects = (projects: Project[]) => {
  const { width } = useWindowDimensions();

  function calculatePad(size: String) {
    var pred = Math.floor((width - 42) / 324);
    var left = Math.floor((width - 324 * pred) / 2);
    var right = left - 100;
    if (right < 1) {
      right = 0;
    }
    console.log(data);
    console.log("Sizes: ", left, right);
    console.log("Predicted: ", Math.floor((width - 12) / 324));

    return {
      left: size !== "small" ? left.toString() + "px" : "10px",
      right: size !== "small" ? right.toString() + "px" : "10px",
    };
  }



  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box
          pad={calculatePad(size)}
          // fill
          // background="#171c21"
          justify="center"
        >
          <Box
            pad={{ top: "10px", bottom: "20px" }}
            fill="horizontal"
            tag="header"
          >
            <Box
              gridArea="header"
              justify="start"
              align="center"
              direction="row"
              margin={{
                vertical: "15px",
                left: "8px",
              }}
            >
              <Text weight="bold" color="#666169" size="xlarge">
                {/* Projects */}
              </Text>
            </Box>
          </Box>

          <Track id={projects.map((item) => item.id)}>
            {(tracks: any, loading: any, error: any) =>
              tracks.data
                ? tracks.data.tracks.map((track: any) => {
                    return (
                      <Card
                        background="#1E252C"
                        border
                        // height="400px"
                        elevation="xxsmall"
                        round="small"
                        pad="medium"
                        direction="column"
                        justify="start"
                        width="400px"
                        margin="small"
                        fill={size === "small" ? "horizontal" : undefined}
                        // onClick={() => {
                        //   alert("Card was Clicked!");
                        // }}
                      >
                        <CardHeader
                          fill="horizontal"
                          justify="start"
                          flex={false}
                        >
                          <Box width="64px" height="64px" flex={false}>
                            <Image
                              fit="contain"
                              src={track.album.images[2].url}
                            />
                          </Box>

                          <Box>
                            {" "}
                            <Text color="brand" weight="bold" size="25px">
                              {track.name}
                            </Text>{" "}
                            <Box direction="row" flex={false} gap="xsmall">
                              <Text size="small">
                                {track.artists
                                  .map((artist: any) => artist.name)
                                  .join(", ")}
                              </Text>
                            </Box>
                            <Text size="small">
                              {" "}
                              {track.data ? track.data.track_number : ""}
                            </Text>
                          </Box>
                        </CardHeader>

                        {/* <CardBody pad={{ top: "small" }}>
          <Text color="#78737a" size="18px">
            {JSON.stringify(track)}
          </Text>
        </CardBody> */}
                        <Box
                          align="center"
                          gap="small"
                          justify="end"
                          direction="row"
                          flex={false}
                        ></Box>
                      </Card>
                    );
                  })
                : null
            }
          </Track>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

const UserCard = (data: UserModel) => {
  return (
    <Box direction="row">
      <Box width="64px" height="64px" flex={false}>
        <Image fit="contain" src={data.image} />
      </Box>

      <Box>
        {" "}
        <Text color="brand" weight="bold" size="25px">
          {data.name}
        </Text>{" "}
        <Box direction="row" flex={false} gap="xsmall">
          <Text size="small">{data.id}</Text>
        </Box>
        <Text size="small"> {data.id}</Text>
      </Box>
    </Box>
  );
};

const App = () => {
  const token = Cookies.get("spotifyAuthToken");
  const [value, setValue] = React.useState("");
  const [ data, setData ] = React.useState();

  function getData(name: string)  {
    fetch('https://spotitter.mattz.space/songs?handle='+ name.toLowerCase()).then(res => {
        const ressss = res.json()
        ressss.then(final => setData(final))
         

     })
  }
  const Title = () => {
    return (
      <Box align="start" justify="center" pad={{ top: "medium" }}>
        <Box
          pad={{ right: "xlarge", left: "large" }}
          direction="column"
          justify="center"
        >
          {/* <Text color="#948D98" size="xlarge" weight="bold">
            BONK
          </Text> */}
          <Keyboard
            onEnter={(event) => {
              console.log("Enter", value);
              getData(value)
            }}
          >
            <TextInput
              size="xlarge"
              color="white"
              placeholder="elonmusk"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            ></TextInput>
          </Keyboard>

          {value.length !== 0 ? <Text>⏎ Press enter to submit</Text> : null}
          <Paragraph color="black" size="xxlarge" margin={{ left: "5px" }}>
            <span
              style={{
                backgroundColor: "grey",
                borderRadius: "5px",
                padding: "3px",
              }}
            >
              Computer Science
            </span>{" "}
            &{" "}
            <a
              href="https://art.mash.studio"
              style={{ textDecoration: "None", color: "inherit" }}
            >
              <span
                style={{
                  backgroundColor: "grey",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              >
                Studio Art
              </span>
            </a>{" "}
            major <strong>@Carleton College</strong>, slated to graduate in
            2021. I make pretty things that try to solve big problems.
          </Paragraph>
          <Box
            fill="horizontal"
            gap="medium"
            direction="row"
            margin={{ left: "5px" }}
          >
            {/*         
            <Button>
              <a href="https://github.com/mashnoon33/">
                <Github color="#666169" />{" "}
              </a>
            </Button> */}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <div
      style={
        {
          // backgroundColor: "#171c21",
        }
      }
    >
      <Grommet full theme={theme}>
        {Title()}
        {token ? (
          <SpotifyApiContext.Provider value={token}>
            {data? data.songs? Projects(data.songs) : Projects([]) :Projects([])  }
            <User>
              {(user: any, loading: any, error: any) => {
                console.log(user);
                if (user && user.data) {
                  // return (UserCard())
                  return UserCard({
                    id: user.data.id,
                    name: user.data.display_name,
                    image: user.data.images[0].url,
                  });
                } else {
                  return null;
                }
              }}
            </User>
          </SpotifyApiContext.Provider>
        ) : (
          // Display the login page
          <Box margin={{ left: "large" }} width="medium">
            <SpotifyAuth
              redirectUri="https://spotitter.netlify.app"
              clientID="1eecbdd768c841b4aa1079f4b20cee61"
              scopes={[Scopes.userReadPrivate, "user-read-email"]} // either style will work
            />
          </Box>
        )}
        <Box
          fill="horizontal"
          height="200px"
          flex={false}
          justify="end"
          align="center"
        >
          {/* <Text color='brand'>Made with ❤️ using Opensource Technologies</Text> */}
        </Box>
      </Grommet>
    </div>
  );
};

const rootElement = document.getElementById("root");

render(
  <QueryClientProvider client={queryClient}>
    <App />{" "}
  </QueryClientProvider>,
  rootElement
);
