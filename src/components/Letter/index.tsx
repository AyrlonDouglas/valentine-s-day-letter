import React from "react";
import {
  Grid,
  IconButton,
  Badge,
  Box,
  useMediaQuery,
  keyframes,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ILetter {
  animation: boolean;
  onClick: () => void;
}
const scaleMaior = keyframes`
0%{
    transform: scale(1);

} 50%{
    transform: scale(1.1);

} 100%{
    transform: scale(1);
}
`;
export default function Letter({ animation, onClick }: ILetter) {
  const size600 = useMediaQuery("(min-width:600px)");

  return (
    <Grid
      item
      xs={8}
      sm={8}
      md={8}
      lg={8}
      xl={8}
      sx={{
        width: "100px",
        display: "flex",
        justifyContent: "center",
        margin: "5rem 0",
        animation: `${!animation ? `${scaleMaior} 1s infinite ease` : ""}`,
      }}
    >
      <IconButton
        sx={{
          width: size600 ? "400px" : "200px",
          height: size600 ? "200px" : "100px",
          borderRadius: "1rem",
          zIndex: 1200,
        }}
        onClick={
          onClick
          // () => {
          //     handleClickOpen();
          //     setHasCartOpen(true);
          //     if (!hasMusicPlay) {
          //       setHasMusicPlay(true);
          //       audio.play();
          //     }
          //   }
        }
      >
        <Badge
          badgeContent={animation ? 0 : 1}
          color="primary"
          sx={{
            // position: "relative",
            ".MuiBadge-badge": {
              transform: `scale(${size600 ? 3 : 2}) translate(50%, -50%)`,
              // top: 0,
              right: size600 ? "-100px" : "-50px",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              // background: "black",
              width: size600 ? "200px" : "100px",
              height: size600 ? "200px" : "100px",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              className="triangulo-direito"
              sx={{
                position: "absolute",
                right: size600 ? "100px" : "45px",
              }}
            ></Box>
            <Box
              className="triangulo-centro2"
              sx={{
                position: "absolute",
                right: size600 ? "-100px" : "-55px",
              }}
            ></Box>
            <Box
              className="triangulo-centro"
              sx={{
                position: "absolute",
                right: size600 ? "-100px" : "-55px",
                top: 0,
              }}
            ></Box>

            <Box
              className="triangulo-esquerdo"
              sx={{
                position: "absolute",
                left: size600 ? "100px" : "55px",
              }}
            ></Box>
            <FavoriteIcon
              color="primary"
              sx={{
                position: "absolute",
                zIndex: 50,
                width: size600 ? "10rem" : "5rem",
                height: size600 ? "10rem" : "5rem",
                right: size600 ? "20px" : "5px",
              }}
            />
          </Box>
        </Badge>
      </IconButton>
    </Grid>
  );
}
