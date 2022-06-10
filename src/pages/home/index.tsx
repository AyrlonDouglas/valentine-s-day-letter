import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Badge,
  IconButton,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TransitionProps } from "@mui/material/transitions";
import { keyframes } from "@mui/system";
import valentineCart from "../../assets/images/valentineCART.png";
import musicaOTERNO from "../../assets/musics/OTerno-Volta.mp3";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import styles from "./styles.module.css";
import "./stylesCSS.css";
import theme from "../../theme/theme";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const scaleMaior = keyframes`
0%{
    transform: scale(1);

} 50%{
    transform: scale(1.1);

} 100%{
    transform: scale(1);

}
`;

const keyFramesT = keyframes`
  from {background-size:0 200%}
`;
const keyframesB = keyframes`
 50% {background-position:0 -100%,0 0}
`;
const cards: string[] = [];
for (let i = 1; i <= 13; i++) {
  cards.push(`src/assets/images/casal/${i}.jpeg`);
}
console.log(cards);
export default function Home() {
  const [hasCartOpen, setHasCartOpen] = useState(false);
  const [hasMusicPlay, setHasMusicPlay] = useState(false);
  const [openLetter, setOpenLetter] = React.useState(false);
  const [hasCloseLetter, setHasCloseLetter] = useState(false);
  const [valueVolume, setValueVolume] = React.useState<number>(70);
  let audio = new Audio(musicaOTERNO);

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    setValueVolume(newValue as number);
    audio.volume = parseFloat(((newValue as number) / 100).toFixed(1));
  };
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });
  const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

  function Deck() {
    const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
    const [props, api] = useSprings(cards.length, (i) => ({
      ...to(i),
      from: from(i),
    })); // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(
      ({
        args: [index],
        active,
        movement: [mx],
        direction: [xDir],
        velocity: [vx],
      }) => {
        const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
        if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        api.start((i) => {
          if (index !== i) return; // We're only interested in changing spring-data for the current spring
          const isGone = gone.has(index);
          const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
          const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
          const scale = active ? 1.1 : 1; // Active cards lift up a bit
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: {
              friction: 50,
              tension: active ? 800 : isGone ? 200 : 500,
            },
          };
        });
        if (!active && gone.size === cards.length)
          setTimeout(() => {
            gone.clear();
            api.start((i) => to(i));
          }, 600);
      }
    );
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
      <>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div className={styles.deck} key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${cards[i]})`,
              }}
            />
          </animated.div>
        ))}
      </>
    );
  }

  const handleClickOpen = () => {
    setOpenLetter(true);
    setHasCloseLetter(false);
  };

  const handleClose = () => {
    setOpenLetter(false);
    setHasCloseLetter(true);
  };

  return (
    <>
      <Container
        sx={{
          height: "100vh",
        }}
      >
        <Box sx={{ position: "fixed", bottom: 0, width: "100px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => audio.play()}>
              <PlayArrowIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={() => audio.pause()}>
              <PauseIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                audio.currentTime = 0;
                audio.pause();
              }}
            >
              <StopIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="h1"
          align="center"
          mt={2}
          fontWeight={700}
          sx={{ textShadow: `3px 0px 0px ${theme.palette.common.white}` }}
        >
          Para Welma Lenhardt
        </Typography>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          height={"70%"}
        >
          {!hasCloseLetter ? (
            <>
              <Grid item>
                <Typography variant="h4" align="center">
                  Chegou uma mensagem para você!
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "5rem 0",
                  animation: `${
                    !hasCartOpen ? `${scaleMaior} 1s infinite ease` : ""
                  }`,
                }}
              >
                <IconButton
                  sx={{
                    width: "400px",
                    height: "200px",
                    borderRadius: "1rem",
                    zIndex: 1200,
                  }}
                  onClick={() => {
                    handleClickOpen();
                    setHasCartOpen(true);
                    if (!hasMusicPlay) {
                      setHasMusicPlay(true);
                      audio.play();
                    }
                  }}
                >
                  <Badge
                    badgeContent={hasCartOpen ? 0 : 1}
                    color="primary"
                    sx={{
                      // position: "relative",
                      ".MuiBadge-badge": {
                        transform: "scale(3) translate(50%, -50%)",
                        top: "-10px",
                        right: "-100px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        // background: "black",
                        width: "200px",
                        height: "200px",
                        display: "flex",
                        // justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        className="triangulo-direito"
                        sx={{ position: "absolute", right: "100px" }}
                      ></Box>
                      <Box
                        className="triangulo-centro2"
                        sx={{ position: "absolute", right: "-100px" }}
                      ></Box>
                      <Box
                        className="triangulo-centro"
                        sx={{ position: "absolute", right: "-100px", top: 0 }}
                      ></Box>

                      <Box
                        className="triangulo-esquerdo"
                        sx={{ position: "absolute", left: "100px" }}
                      ></Box>
                      <FavoriteIcon
                        color="primary"
                        sx={{
                          position: "absolute",
                          zIndex: 50,
                          width: "10rem",
                          height: "10rem",
                          right: "20px",
                        }}
                      />
                    </Box>
                  </Badge>
                </IconButton>
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <Typography variant="h4" align="center" margin={8}>
                  Uma pequena amostra do nosso tempo juntos, espero atualizá-las
                  em breve.
                </Typography>
              </Grid>

              <Grid
                item
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{
                  display: `${hasCloseLetter ? "flex" : "none"}`,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "300px",
                  height: "600px",
                }}
                className={`flex fill center ${styles.container}`}
              >
                <Deck />
                <Typography
                  fontWeight={700}
                  sx={{ position: "absolute", top: "600px", color: "white" }}
                >
                  Em breve novas atualizações ;)
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <Dialog
        open={openLetter}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          fontWeight={500}
          fontSize={32}
          sx={{ textAlign: "center" }}
        >
          Para uma pessoa mais que especial, a pessoa que amo!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            fontSize={24}
            sx={{ color: "rgba(0,0,0,0.8)" }}
          >
            <div className="container">
              <p
                className={openLetter ? "typing" : ""}
                style={{ textAlign: "justify" }}
              >
                Oi amor, tudo bem ? Primeiramente, tenho que adiantar que sou
                péssimo com palavras (apesar de você já saber disso), sobretudo
                quando estou falando sobre sentimento, que é um pouco do que eu
                falarei aqui. Já era de se imaginar que hoje nós não estariamos
                juntos "presencialmente", essa viagem pegou de surpresa nossos
                corações, quem imaginaria que estariamos juntos apesar de tudo,
                seja a distância, idade, diferenças de pensamento, é até
                engraçado como o racional se torna ínfimo quando o coração bate
                mais forte por amar com alguém. Eu gosto muito de acreditar no
                determinismo, ou seja, que tudo que acontece já foi determinado
                lá no passado. Acredito que nos conhecermos por um propósito,
                que nossa conexão instantânea tem um porquê claro, e que em um
                futuro talvez descubramos essas respostas, mas te digo, os
                porquês nada importam, o que de fato é relevante nessa vida é
                simplesmente ser feliz, e é o sentimento que me transborda em só
                pensar em ti. Sem dúvidas você é uma das pessoas mais especiais
                que já tive em minha vida, e sou eternamente grato por poder
                compartilhar um pouco da minha vida com você. Lembro do nosso
                primeiro encontro naquele bar, do seu olhar penetrante a me
                olhar e eu sem jeito e sem saber muito bem o que fazer, mas
                sabia que eu precisava falar contigo. "Seria muita pretensão
                minha te chamar para dançar?" foi minha primeira frase dirigida
                a você, e em seguida a retórica positiva, mas sorte a minha! E
                dai se inicia uma história a mais nas nossas vidas, e que a
                partir de então, desejo que todas as próximas histórias vocês
                também esteja inclusa. Parafraseando Carl Sagan, Dada a Vastidão
                do espaço e na imensidão do tempo, é uma alegria poder
                compartilhar um planeta e um época com você Welma. <br />
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                  }}
                >
                  EU AMO VOCÊ &#10084;
                </span>
                <br /> Ass.: Ayrlon
              </p>

              <div className={openLetter ? "hiders" : ""}>
                {(function () {
                  let paragraphs = [];
                  let count = 0;
                  for (let i = 0; i < 100; i++) {
                    count;
                    paragraphs.push(
                      <p
                        style={{
                          animationDelay: `${i * 2}s`,
                        }}
                      >
                        &nbsp;
                      </p>
                    );
                  }
                  return paragraphs;
                })()}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: "0 auto" }}>
          <Button onClick={handleClose} variant="contained">
            <Typography textTransform={"capitalize"}>
              Leu tudinho? Clica em mim!
            </Typography>
          </Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
