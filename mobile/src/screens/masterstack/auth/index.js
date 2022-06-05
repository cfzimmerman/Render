// First authentication screen. Takes email, decides whether to proceed to Sign Up or Login. Sends appropriate code based on correct flow.
export { default as OnboardingLanding } from "./OnboardingLanding";

// If an existing user, prompt them for the code sent to them by the SES - Lambda function. If correct, log them in.
export { default as LoginCode } from "./LoginCode";

// If a new user, prompt them for the code sent to them by Cognito. If correct, confirm their email and proceed to Display Name.
export { default as SignupCode } from "./SignupCode";

// User chooses non-unique display name. Between 2 and 20 characters. Spaces and special characters allowed.
export { default as DisplayName } from "./DisplayName";

// User chooses unique tag that can be easily searched and referenced. Between 2 and 20 characters. Only lowercase letters, numbers, and hyphens.
export { default as Gamertag } from "./Gamertag";

// User selects their birthday from a modal. If older than 13, the user is allowed to continue.
export { default as Birthday } from "./Birthday";

// User is provided link to terms of service. If they approve, their onboarding is completed, and they're routed to HomeLanding.js
export { default as TOS } from "./TOS";
