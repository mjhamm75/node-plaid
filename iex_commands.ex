PlaidWebhookController.link_automatically_verified_account("1228335c-70a6-43a5-b9e7-c1a1c242ab7f")

alias SharedDb.Repo
alias SharedDb.Models.Accounts.PlaidLogin
pl = Repo.get(PlaidLogin, "af68c400-dfd7-4476-9f51-a11855945e9a")
pl.plaid_access_token
