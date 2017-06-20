var basicAuth = new HttpBasicAuth(function(username, password) {
  return 'healthfitness' == username & 'passwordia2016#' == password;
});
basicAuth.protect();

import '/imports/startup/server';
