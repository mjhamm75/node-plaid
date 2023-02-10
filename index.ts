import {
  Configuration,
  CountryCode,
  DepositoryAccountSubtype,
  ItemPublicTokenExchangeRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
  SandboxPublicTokenCreateRequest,
  SandboxItemSetVerificationStatusRequest,
  SandboxItemSetVerificationStatusRequestVerificationStatusEnum,
} from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "6202ddba6714d6001a49b4f2",
      "PLAID-SECRET": "fc092ee133d423d2bf1f3ed9f1c21b",
    },
  },
});

const client = new PlaidApi(configuration);
const userId = "a554285f-0e8c-4317-8af1-3bf6d0da7892";
const accountId = "AJqqz4LZAAubvbjAAmjRTllQq8RjMWc6g78Eg";
const accessToken = "access-sandbox-b4f18fb3-8adf-418f-acf9-3d3c5eaa55ff";

async function setVerificationStatus(
  client: PlaidApi,
  accessToken: string,
  accountId: string
) {
  const request: SandboxItemSetVerificationStatusRequest = {
    access_token: accessToken,
    account_id: accountId,
    verification_status:
      SandboxItemSetVerificationStatusRequestVerificationStatusEnum.AutomaticallyVerified,
  };
  return await client.sandboxItemSetVerificationStatus(request);
}

async function getLinkToken(client: PlaidApi) {
  try {
    const token = await client.linkTokenCreate({
      client_name: "Swyf",
      products: [Products.Auth],
      country_codes: [CountryCode.Us],
      language: "en",
      user: {
        client_user_id: userId,
      },
      account_filters: {
        depository: {
          account_subtypes: [
            DepositoryAccountSubtype.Checking,
            DepositoryAccountSubtype.Savings,
          ],
        },
      },
      webhook: "https://jason.swyf.ngrok.io/webhook/partners/plaid",
      redirect_uri: "https://api.swyf.app/oauth",
    });

    return token;
  } catch (error) {
    console.log("link token", error);
  }
}

// async function getAccessToken(client: PlaidApi) {}

// async function createPublicToken(client: PlaidApi) {
//   const publicTokenRequest: SandboxPublicTokenCreateRequest = {
//     institution_id: INSTITUTION_ID,
//     initial_products: [Products.Auth],
//   };
//   try {
//     const publicTokenResponse = await client.sandboxPublicTokenCreate(
//       publicTokenRequest
//     );
//     const publicToken = publicTokenResponse.data.public_token;

//     const exchangeRequest: ItemPublicTokenExchangeRequest = {
//       public_token: publicToken,
//     };
//     const exchangeTokenResponse = await client.itemPublicTokenExchange(
//       exchangeRequest
//     );
//     return exchangeTokenResponse.data.access_token;
//   } catch (error) {
//     console.log("err", error);
//   }
// }

async function main() {
  const result = await setVerificationStatus(client, accessToken, accountId);
  console.log("result", result);

  console.log("finished");
}

main();
