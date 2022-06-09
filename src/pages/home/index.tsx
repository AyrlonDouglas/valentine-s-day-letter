import React, { useState } from "react";
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
import "./stylesCSS.css";
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
    transform: scale(1.3);

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

export default function Home() {
  const [hasCartOpen, setHasCartOpen] = useState(false);
  const [hasMusicPlay, setHasMusicPlay] = useState(false);
  const [openLetter, setOpenLetter] = React.useState(false);
  const audio = new Audio(musicaOTERNO);

  if (typeof audio.loop == "boolean") {
    audio.loop = true;
  } else {
    audio.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
  }
  const handleClickOpen = () => {
    setOpenLetter(true);
  };

  const handleClose = () => {
    setOpenLetter(false);
    // setHasMusicPlay(false);
    audio.pause();
    audio.controls = true;
    // setHasCartOpen(false);
  };

  return (
    <>
      <Container
        sx={{
          height: "100vh",
        }}
      >
        <Typography
          variant="h1"
          align="center"
          mt={2}
          fontWeight={700}
          sx={{ textShadow: "1px 1px 4px white" }}
        >
          Para Welma Lenhardt
        </Typography>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          height={"70%"}
        >
          <Grid item>
            <Typography variant="h4" align="center">
              Um admirador nada secreto enviou uma mensagem para você.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: "flex",
              justifyContent: "center",

              animation: `${
                !hasCartOpen ? `${scaleMaior} 1s infinite ease` : ""
              }`,
            }}
          >
            <IconButton
              sx={{ width: "200px", height: "200px" }}
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
                    color="error"
                    sx={{
                      position: "absolute",
                      zIndex: 50,
                      width: "10rem",
                      height: "10rem",
                      right: "20px",
                    }}
                  />
                </Box>

                {/* <img
                  src={valentineCart}
                  style={{
                    width: "10rem",
                    margin: "0 auto",
                  }}
                /> */}
              </Badge>
            </IconButton>
          </Grid>
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
              <p className={openLetter ? "typing" : ""}>
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
                compartilhar um pouco da minha vida com você. Parafraseando Carl
                Sagan, Dada a Vastidão do espaço e na imensidão do tempo, é uma
                alegria poder compartilhar um planeta e um época com você Welma.
                Lembro do nosso primeiro encontro naquele bar, do seu olhar
                penetrante a me olhar e eu sem jeito e sem saber muito bem o que
                fazer, mas sabia que eu precisava falar contigo. "Seria muita
                pretensão minha te chamar para dançar?" foi minha primeira frase
                dirigida a você, e em seguida a retórica positiva, mas sorte a
                minha! E dai se inicia uma história a mais nas nossas vidas, e
                que a partir de então, desejo que todas as próximas histórias
                vocês também esteja inclusa. Amo vo
              </p>

              <div className={openLetter ? "hiders" : ""}>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Fechar
          </Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
