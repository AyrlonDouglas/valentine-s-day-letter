import React, { useState, useEffect } from "react";
// Mui
import {
  Typography,
  Container,
  Grid,
  Badge,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { keyframes } from "@mui/system";

//Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
// Styles
import "./stylesCSS.css";

// Data
import musicaOTERNO from "../../assets/musics/OTerno-Volta.mp3";
import theme from "../../theme/theme";

// Componentes
import DialogLetter from "../../components/Dialog/Letter";
import Deck from "../../components/Deck";
import Letter from "../../components/Letter";
const scaleMaior = keyframes`
0%{
    transform: scale(1);

} 50%{
    transform: scale(1.1);

} 100%{
    transform: scale(1);

}
`;

const cards: string[] = [];
for (let i = 1; i <= 13; i++) {
  cards.push(`../../../casal/${i}.jpeg`);
}
export default function Home() {
  const [hasCartOpen, setHasCartOpen] = useState(false);
  const [hasMusicPlay, setHasMusicPlay] = useState(false);
  const [openLetter, setOpenLetter] = React.useState(false);
  const [hasCloseLetter, setHasCloseLetter] = useState(false);
  const [valueVolume, setValueVolume] = React.useState<number>(70);
  let audio = new Audio(musicaOTERNO);
  const size600 = useMediaQuery("(min-width:600px)");

  const handleClickOpen = () => {
    setOpenLetter(true);
    setHasCloseLetter(false);
  };

  const handleClose = () => {
    setOpenLetter(false);
    setHasCloseLetter(true);
  };

  const handleClickLetter = (): void => {
    handleClickOpen();
    setHasCartOpen(true);
    if (!hasMusicPlay) {
      setHasMusicPlay(true);
      audio.play();
    }
  };
  return (
    <>
      <Container
        sx={{
          height: "100vh",
        }}
      >
        <Typography
          variant={size600 ? "h1" : "h3"}
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
          height={size600 ? "70%" : "40%"}
        >
          {!hasCloseLetter ? (
            <>
              <Grid item>
                <Typography variant={size600 ? "h4" : "h5"} align="center">
                  Chegou uma mensagem para você!
                </Typography>
              </Grid>
              <Letter animation={hasCartOpen} onClick={handleClickLetter} />
            </>
          ) : (
            <>
              <Grid item>
                <Typography variant="h4" align="center" margin={8}>
                  Uma pequena amostra do nosso tempo juntos
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
                  cursor: `url("https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png") 39 39, auto`,
                }}
                // className={`flex fill center ${styles.container}`}
              >
                <Deck cards={cards} />
                <Typography
                  fontWeight={700}
                  sx={{ position: "absolute", top: "700px", color: "white" }}
                >
                  Em breve a gente atualiza essas fotos!
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <DialogLetter handleClose={handleClose} openLetter={openLetter} />
    </>
  );
}
