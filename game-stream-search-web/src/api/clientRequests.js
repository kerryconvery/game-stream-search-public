
const toClient = client => (
  {
    title: client.title,
    firstName: client.firstName,
    lastName: client.lastName,
    phoneNumber: client.phoneNumber,
  }
)

export const createGetClientsRequest = httpClient => () => (
  httpClient.get({
    url: '/clients',
  }).then(response => response.data.map(toClient))
);

export const createRegisterClientRequest = httpClient => (client) => (
  httpClient.post({
    url: '/clients',
    body: client,
  })
);
