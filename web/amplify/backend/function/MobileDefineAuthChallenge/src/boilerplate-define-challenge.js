exports.handler = (event, context) => {
  if (event.request.session &&
    event.request.session.length >= 3 &&
    event.request.session.slice(-1)[0].challengeResult === false) {
    // User provided a wrong answer 3 times
    event.response.issueTokens = false
    event.response.failAuthentication = true
  } else if (event.request.session &&
    event.request.session.length &&
    event.request.session.slice(-1)[0].challengeName === 'CUSTOM_CHALLENGE' && // Only accept custom challenges
    event.request.session.slice(-1)[0].challengeResult === true) {
    // Correct answer, log in
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
  } else {
    // Wrong answer, try again
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
  }
}
