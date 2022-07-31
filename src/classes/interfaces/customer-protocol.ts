/* interface para trabalhar com os 2 tipos de clientes */
export interface CustomerOrder {
  getName(): string;
  getIDN(): string;
}

export interface IndividualCustomerProtocol {
  firstName: string;
  lastName: string;
  cpf: string;
}
export interface EnterpriselCustomerProtocol {
  name: string;
  cnpj: string;
}
