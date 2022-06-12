import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import "./styleCSS.css";
import { TransitionProps } from "@mui/material/transitions";

import theme from "../../../theme/theme";
interface IDialogLetter {
  openLetter: boolean;
  handleClose: () => void;
}
export default function DialogLetter({
  openLetter,
  handleClose,
}: IDialogLetter) {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={openLetter}
      // TransitionComponent={Transition}
      /**
       * // Não está funcionando bem quando é chamado em outro arquivo!!!
       * Deixa o Dialog em cima da página após desmontado
       */

      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontWeight={500} fontSize={32} sx={{ textAlign: "center" }}>
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
              // style={{ textAlign: "justify" }}
            >
              Oi amor, tudo bem ? Primeiramente, tenho que adiantar que sou
              péssimo com palavras (apesar de você já saber disso), sobretudo
              quando estou falando sobre sentimento, que é um pouco do que eu
              falarei aqui. Já era de se imaginar que hoje nós não estariamos
              juntos "presencialmente", essa viagem pegou de surpresa nossos
              corações, quem imaginaria que estariamos juntos apesar de tudo,
              seja a distância, idade, diferenças de pensamento, é até engraçado
              como o racional se torna ínfimo quando o coração bate mais forte
              por amar com alguém. Eu gosto muito de acreditar no determinismo,
              ou seja, que tudo que acontece já foi determinado lá no passado.
              Acredito que nos conhecermos tem um propósito, que nossa conexão
              instantânea tem um porquê claro, e que em um futuro talvez
              descubramos essas respostas, mas te digo, os porquês nada
              importam, o que de fato é relevante nessa vida é simplesmente ser
              feliz, e é o sentimento que me transborda em só pensar em ti. Sem
              dúvidas você é uma das pessoas mais especiais que já tive em minha
              vida, e sou eternamente grato por poder compartilhar um pouco da
              minha vida com você. Lembro do nosso primeiro encontro naquele
              bar, do seu olhar penetrante e eu sem jeito e sem saber muito bem
              o que fazer, mas sabia que eu precisava falar contigo. "Seria
              muita pretensão minha te chamar para dançar?" foi minha primeira
              frase dirigida a você, e em seguida veio a retórica positiva, mas
              sorte a minha! E dai se inicia uma história a mais nas nossas
              vidas, e que a partir de então, desejo que todas as próximas
              histórias vocês também esteja inclusa. Parafraseando Carl Sagan,
              Dada a Vastidão do espaço e na imensidão do tempo, é uma alegria
              poder compartilhar um planeta e um época com você Welma. <br />
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
              {(() => {
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
            Leu tudinho? Então Clica aqui
          </Typography>
        </Button>
        {/* <Button onClick={handleClose}>Agree</Button> */}
      </DialogActions>
    </Dialog>
  );
}
