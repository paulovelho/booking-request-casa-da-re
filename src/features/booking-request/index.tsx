import React, { Fragment, ReactElement, useState } from "react";
import { 
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


export default function BookingRequest(): ReactElement {
  const DateFn = new DateFnsUtils();

  const [people, changePeople] = useState<string>("2");
  const [checkin, handleDateChangeCheckin] = useState<Date>(DateFn.addDays(new Date(), 180));
  const [checkout, handleDateChangeCheckout] = useState<Date>(DateFn.addDays(new Date(), 195));


  const Request = (): void => {
    console.info("sending: ", {
      people: people,
      checkin: checkin,
      checkout: checkout,
    });
  }

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}> 
        <div>
          <h2>Solicitar Orçamento</h2>

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
          <Button 
            variant="contained"
            color="primary"
            onClick={Request}
            fullWidth >
            Quero ficar com a Rê!
          </Button>

        </div>
      </MuiPickersUtilsProvider>
    </Container>
  );
}
