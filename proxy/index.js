console.log("Setting up reverse proxy");
http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'https://flyff-api.sniegu.fr/' });
});