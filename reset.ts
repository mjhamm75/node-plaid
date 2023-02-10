import {
  Configuration,
  ItemPublicTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  SandboxItemResetLoginRequest,
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
const accessToken = "access-sandbox-9c3fd752-780c-4921-bc1d-4455a857ea2e";

async function resetLogin(client: PlaidApi, accessToken: string) {
  const request: SandboxItemResetLoginRequest = {
    access_token: accessToken,
  };
  try {
    console.log("here");

    const response = await client.sandboxItemResetLogin(request);

    console.log("response", response);
    // create a public_token for the Item and use it to
    // initialize Link in update mode.
    const pt_request: ItemPublicTokenCreateRequest = {
      access_token: accessToken,
    };
    const pt_response = await client.itemCreatePublicToken(pt_request);
    console.log("pt_response", pt_response);
  } catch (error) {
    console.log("err", error);
  }
}

async function main() {
  const result = await resetLogin(client, accessToken);

  console.log("finished");
}

main();
