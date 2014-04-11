var DfpUser = function(appName, networkCode, oauth2Info) {

  this.setApplicatioName(appName);
  this.setNetworkCode(code);
  this.setOauth2(oauth2Info);

};


DfpUser.prototype.setApplicatioName(name) {
  this.appName = name;
};

DfpUser.prototype.getApplicatioName() {
  return this.appName || "";
};



DfpUser.prototype.setNetworkCode(code) {
  this.networkCode = code;
};

DfpUser.prototype.getNetworkCode() {
  return this.networkCode || "";
};



DfpUser.prototype.setOauth2(oauth2Info) {
  this.oauth2Info = oauth2Info;
};

DfpUser.prototype.getOauth2() {
  return this.oauth2Info || null;
};


DfpUser.prototype.getAccessToken(refreshToken, callback) {
  if (!this.oauth2Info)
    throw new Exception('no authentication yet');
  this.oauth2Info.refreshAccessToken(callback)
};



DfpUser.prototype.validate() {

  if (!this.getOauth2())
    throw new Exception('no oauth2 authentication token');

  if (!this.getApplicatioName().trim())
    throw new Exception('application name cannot be empty');
};


DfpUser.prototype.getService(serviceName, version) {
  // TODO
}


modules.exports = DfpUser;
