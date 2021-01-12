import axios from 'axios';

class ContactService {
  private api = "http://api.contato.paulovelho.com.br/emails";
  private authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjciLCJuYW1lIjoiUlx1MDBlYSIsIm1haWxfZnJvbSI6InJlQHBhdWxvdmVsaG8uY29tIn0.2oWNfs_mINb2uJlxqIvBwzGI4wAACXU07uujHBGCesI";

  buildMessage(data: any) {
    const dateFormat = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    return `Novo Contato:\n\n
      ${(data.origin ? 'Origem: ' + data.orign + '\n' : '')}
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
      from: email,
    };
  }

  async send(data: any) {
    const payload = this.buildPayload(data);
    console.info("sending ", payload);

    return axios.post(this.api, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authToken,
        },
      })
      .then(data => data.data);
  }
}

export default new ContactService();
