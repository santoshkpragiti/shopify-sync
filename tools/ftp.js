
// Initialize NPM libraries
var FTP = require('ftp');

// Initialize tools
var tools = './../tools/'

// Initialize config
var config = require('./../config');

// Functions ===================================================================

// Setup FTP: makes an FTP client using config settings
function setupFTP (next) {
	console.log('Setting up FTP client at '+config.ftpHost+'...');

	// Initialize ftpClient
	var ftp = new FTP();

	// Setup listeners
	ftp
		.on('ready', function () {
			next(null, ftp);
		})
		.on('error', function (error) {
			next(error);
		});

	// Start connection
	ftp.connect({
		host: config.ftpHost,
		user: config.ftpUsername,
		password: config.ftpPassword
	});
};

// List FTP Files: lists ftp files in directory
function listFTPFiles ({client, directory}, next) {
	console.log('Getting list of files from '+directory+'...');
	client.list(directory, function (err, list) {
		next(err, list);
	});
};

// Get FTP File: gets an FTP file using a path
function getFTPFile({client, path}, next) {
	console.log('Getting '+path+'...');
	client.get(path, function (err, file) {
		next(err, file);
	});
};

// Exports =====================================================================
module.exports = {
	'get': function ({client, path}, next) {getFTPFile({client, path}, next)},
	'list': function ({client, directory}, next) {listFTPFiles({client, directory}, next)},
	'setup': function (next) {setupFTP(next)},
}
