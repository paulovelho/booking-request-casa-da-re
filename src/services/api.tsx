import axios from 'axios';

class ContactService {
  private api = "http://paulovelho.com/contato/api";
  private authToken = "authtoken";

  buildMessage(data: any) {
    const dateFormat = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    return `Novo Contato:\n
      Nome: ${data.name}\n
      Email: ${data.email}\n
      Data de checkin: ${dateFormat.format(data.checkin)}\n
      Data de chekout: ${dateFormat.format(data.checkout)}\n
      Datas fechadas?: ${data.fixedDates}\n
      Quantidade de pessoas: ${data.people}\n
      Comentários: ${data.comments}
    `;
  }

  buildPayload(data: any) {
    const email: string = data.email;
    const message: string = this.buildMessage(data);
    const subject = `Novo pedido de orçamento para AirBnb (de ${data.name})`;
    return {
      subject: subject,
      message: message,
      to: email,
    };
  }

  async send(data: any) {
    const payload = this.buildPayload(data);
    console.info("sending ", payload);

    return axios.post(this.api, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.authToken,
        },
      });
  }
}

export default new ContactService();
