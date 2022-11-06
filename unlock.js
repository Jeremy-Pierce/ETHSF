const { membersOnly, hasValidMembership, buildCheckoutUrl } = configureUnlock({
    locks: {
      '0xafa8fE6D93174D17D98E7A539A90a2EFBC0c0Fc1': {
        network: 4
      }
    }
  },
  passport, // the passport instance
  {
    // (advanced, optional) config object
    // Customize te RPC provider URLs
    providers: {
      1: 'provider URL',
      4: 'provider URL',
      100: 'provider URL',
      137: 'provider URL',
    },
    // Customize the baseUrl for the application (do not include a path!)
    baseUrl: 'https://myapp.tld:port'
  }
)

// Add to routes
app.get('/members-only', membersOnly, (req, res) => {
  res.send('You are a member!')
})
