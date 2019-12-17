//SK8
//twilio test account sid: AC5f775c8920c1a826f60be35c0855a6e4
//test auth token: 702c82eb59b575b09fa3f63d5b0c3ce2
//
//twilio chat test service
//service sid: IS7c9e54959cb24abe8f10c3ff9ca3c4cd
//
//twilio test api key
//sid: SK31da49150275c8720302aaa1681cd491
//hey type: standard
//secret: Xt8sQ33SSLnFzLw9Foh03zCIwimZqSXm

//account sid: AC985571b788d6453113144e2b53bcdd51
//servuce sid: ISf96616277248463e83fc3cfca4264b7a
//api_key: SK796de1869fde73acc9aab014264c7cf2
//api_secret: Sj29oIRuTemSG4rmKtfpbR5SrhJq7iZJ

//
//test acc: AC2415c98eb58c8aafe67993e0248325dc
//stest token: cf1aeb464d919784ec2ad34167dfbc0c
//api key: SKd9460d747d1304783f71b7cee395b610
//api secret: 0KQJIaGrAWbzFLHeUSX9EC8ehc0hh3Qn
//serviceSid: IS00ad22fc46dc4bc583586904724c64e9

export default config={
  "chatClient": {
    "options": {
      "logLevel": "info"
    }

  },
  "tokenGenerator":{
    "accountSid": "AC2415c98eb58c8aafe67993e0248325dc",
    "signingKeySid": "SKd9460d747d1304783f71b7cee395b610",
    "signingKeySecret": "0KQJIaGrAWbzFLHeUSX9EC8ehc0hh3Qn",
    "serviceSid": "IS00ad22fc46dc4bc583586904724c64e9",
    "apns":"CRcb520272f9900e423f7471181898f9fb",
    // "accountSid": "AC985571b788d6453113144e2b53bcdd51",
    // "signingKeySid": "SK796de1869fde73acc9aab014264c7cf2",
    // "signingKeySecret": "Sj29oIRuTemSG4rmKtfpbR5SrhJq7iZJ",
    // "serviceSid": "ISf96616277248463e83fc3cfca4264b7a",
  }
};
