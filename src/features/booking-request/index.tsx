import React, { Fragment, ReactElement, useState } from "react";
import { 
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import ContactServices from '../../services/api'

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  error: {
    color: "red",
    "font-weight": "bold",
    padding: "10px",
  },
  success: {
    color: "green",
    "font-weight": "bold",
  },
  textarea: {
    resize: "both",
    width: "100%",
  },
}));

export default function BookingRequest(): ReactElement {
  const classes = useStyles();
  const DateFn = new DateFnsUtils();
  let origin = '';

  const [showSubmit, changeShowSubmit] = useState<boolean>(true);
  const [showSuccess, changeShowSuccess] = useState<boolean>(false);
  const [showError, changeShowError] = useState<boolean>(false);
  const [errorMsg, changeErrorMsg] = useState<string>("ERRO!");

  const [name, changeName] = useState<string>("");
  const [email, changeEmail] = useState<string>("");
  const [people, changePeople] = useState<string>("2");
  const [checkin, handleDateChangeCheckin] = useState<Date>(DateFn.addDays(new Date(), 180));
  const [checkout, handleDateChangeCheckout] = useState<Date>(DateFn.addDays(new Date(), 195));
  const [fixedDates, changeFixedDates] = useState<boolean>(false);
  const [comments, handleComments] = useState<string>("");

  const getQueryParams = () => {
    return window.location.search
      .replace('?', '')
      .split('&')
      .map(q => {
        const qsplit = q.split('=');
        return {
          key: qsplit[0],
          data: qsplit[1],
        }
      })
  };
  const getOrigin = () => {
    const params = getQueryParams();
    const qOrigin = params.filter(q => q.key === "origin");
    if (qOrigin.length > 0) origin = qOrigin[0].data;
  }

  const Request = (): void => {
    changeShowSubmit(false);
    changeShowError(false);
    changeShowSuccess(false);
    const data = {
      name: name,
      email: email,
      people: people,
      checkin: checkin,
      checkout: checkout,
      fixedDates: fixedDates,
      comments: comments,
      origin: origin,
    };
    ContactServices.send(data)
      .then(result => {
        console.info("sent! ", result);
        if (result.success) {
          changeShowSuccess(true);
        } else {
          changeErrorMsg(result.message);
          changeShowSubmit(true);
          changeShowError(true);
        }
      })
      .catch(err => {
        changeErrorMsg("Ocorreu um erro ao enviar sua solicitação!");
        changeShowSubmit(true);
        changeShowError(true);
        console.error(err);
      })
  }

  getOrigin();

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}> 
        <div>
          <h2>Solicitar Orçamento</h2>


          <img className="img-fluid" 
            src={`${process.env.PUBLIC_URL}/images/mm.jpeg`} 
            alt="Casa Nerd"/>

          <br/><br/>
          <TextField
            fullWidth
            id="name"
            label="Nome"
            value={name}
            onChange={newData => newData && changeName(newData.target.value)} 
          />
          <br/><br/>
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={email}
            onChange={newData => newData && changeEmail(newData.target.value)} 
          />

          <br/><br/>
          <InputLabel shrink id="people-label">Quantas Pessoas</InputLabel>
          <Select
            fullWidth
            labelId="people-label"
            id="people"
            value={people}
            onChange={event => changePeople(event.target.value as string)} >
            <MenuItem value="1">Viajo sozinho</MenuItem>
            <MenuItem value="2">Eu e alguém</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">Ah, é um grupo aí...</MenuItem>
          </Select>

          <br/><br/>
          <DatePicker
            fullWidth
            disablePast
            id="checkin"
            label="Data de Entrada"
            format="dd/MM/yyyy"
            value={checkin}
            onChange={newDate => newDate && handleDateChangeCheckin(newDate)} 
          />
          <br/><br/>
          <DatePicker
            fullWidth
            disablePast
            id="checkout"
            label="Data de Saída"
            format="dd/MM/yyyy"
            value={checkout}
            onChange={newDate => newDate && handleDateChangeCheckout(newDate)} 
          />

          <br/><br/>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Minhas datas já estão fechadas!"
            labelPlacement="end"
            onChange={event => event.target && changeFixedDates((event.target as HTMLInputElement).checked)}
          />

          <br/><br/>
          <TextareaAutosize
            className={classes.textarea}
            rowsMin={3}
            aria-label="maximum height"
            placeholder="Algum comentário?"
            value={comments}
            onChange={event => event.target && handleComments(event.target.value)}
          />

          <br/><br/>
          {
            showError && 
            <div className={classes.error}>
              {errorMsg}
            </div>
          }
          {
            showSuccess && 
            <div className={classes.success}>
              Mensagem enviada com sucesso! A Rê vai entrar em contato com você!
            </div>
          }
          <Button 
            variant="contained"
            color="primary"
            onClick={Request}
            disabled={!showSubmit}
            fullWidth >
            Quero ficar com a Rê!
          </Button>

          <br/><br/>
          <br/><br/>
          <br/><br/>
        </div>
      </MuiPickersUtilsProvider>
    </Container>
  );
}
