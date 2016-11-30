SystemJS.config({
	paths: {
		"github:": "jspm_packages/github/",
		"npm:": "jspm_packages/npm/"
	},
	browserConfig: {
		"baseURL": "/",
		"paths": {
			"src": "./"
		}
	},
	packages: {
		"src": {
			"defaultExtension": "js",
			"main": "./index.js"
		}
	}
});

SystemJS.config({
	packageConfigPaths: [
		"github:*/*.json",
		"npm:@*/*.json",
		"npm:*.json"
	],
	map: {
		"angular": "github:angular/bower-angular@1.5.7",
		"angular-material": "github:angular/bower-material@1.0.9",
		"angular-ui-router": "github:angular-ui/angular-ui-router-bower@0.3.1",
		"assert": "npm:jspm-nodelibs-assert@0.2.0",
		"browserify": "npm:browserify@13.1.0",
		"buffer": "npm:jspm-nodelibs-buffer@0.2.0",
		"child_process": "npm:jspm-nodelibs-child_process@0.2.0",
		"constants": "npm:jspm-nodelibs-constants@0.2.0",
		"crypto": "npm:jspm-nodelibs-crypto@0.2.0",
		"css": "github:systemjs/plugin-css@0.1.23",
		"d3": "npm:d3@3.5.17",
		"decaf-common": "github:biosustain/decaf-frontend-common@master",
		"dgram": "npm:jspm-nodelibs-dgram@0.2.0",
		"dns": "npm:jspm-nodelibs-dns@0.2.0",
		"domain": "npm:jspm-nodelibs-domain@0.2.0",
		"ecc-jsbn": "npm:ecc-jsbn@0.1.1",
		"events": "npm:jspm-nodelibs-events@0.2.0",
		"fs": "npm:jspm-nodelibs-fs@0.2.0",
		"http": "npm:jspm-nodelibs-http@0.2.0",
		"https": "npm:jspm-nodelibs-https@0.2.0",
		"jodid25519": "npm:jodid25519@1.0.2",
		"jsbn": "npm:jsbn@0.1.0",
		"module": "npm:jspm-nodelibs-module@0.2.0",
		"net": "npm:jspm-nodelibs-net@0.2.0",
		"os": "npm:jspm-nodelibs-os@0.2.0",
		"path": "npm:jspm-nodelibs-path@0.2.0",
		"ng-file-upload": "npm:ng-file-upload@12.2.13",
		"process": "npm:jspm-nodelibs-process@0.2.0",
		"punycode": "npm:jspm-nodelibs-punycode@0.2.0",
		"querystring": "npm:jspm-nodelibs-querystring@0.2.0",
		"source-map": "npm:source-map@0.5.6",
		"stream": "npm:jspm-nodelibs-stream@0.2.0",
		"string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
		"timers": "npm:jspm-nodelibs-timers@0.2.0",
		"tls": "npm:jspm-nodelibs-tls@0.2.0",
		"tty": "npm:jspm-nodelibs-tty@0.2.0",
		"tweetnacl": "npm:tweetnacl@0.13.3",
		"url": "npm:jspm-nodelibs-url@0.2.0",
		"util": "npm:jspm-nodelibs-util@0.2.0",
		"vm": "npm:jspm-nodelibs-vm@0.2.0",
		"zlib": "npm:jspm-nodelibs-zlib@0.2.0"
	},
	packages: {
		"github:angular/bower-material@1.0.9": {
			"map": {
				"css": "github:systemjs/plugin-css@0.1.23",
				"angular-aria": "github:angular/bower-angular-aria@1.5.7",
				"angular-animate": "github:angular/bower-angular-animate@1.5.7",
				"angular": "github:angular/bower-angular@1.5.7"
			}
		},
		"github:angular/bower-angular-aria@1.5.7": {
			"map": {
				"angular": "github:angular/bower-angular@1.5.7"
			}
		},
		"github:angular/bower-angular-animate@1.5.7": {
			"map": {
				"angular": "github:angular/bower-angular@1.5.7"
			}
		},
		"github:angular-ui/angular-ui-router-bower@0.3.1": {
			"map": {
				"angular": "github:angular/bower-angular@1.5.7"
			}
		},
		"npm:ecc-jsbn@0.1.1": {
			"map": {
				"jsbn": "npm:jsbn@0.1.0"
			}
		},
		"npm:jodid25519@1.0.2": {
			"map": {
				"jsbn": "npm:jsbn@0.1.0"
			}
		},
		"npm:browserify@13.1.0": {
			"map": {
				"JSONStream": "npm:JSONStream@1.1.4",
				"htmlescape": "npm:htmlescape@1.1.1",
				"browser-resolve": "npm:browser-resolve@1.11.2",
				"browser-pack": "npm:browser-pack@6.0.1",
				"read-only-stream": "npm:read-only-stream@2.0.0",
				"shell-quote": "npm:shell-quote@1.6.1",
				"timers-browserify": "npm:timers-browserify@1.4.2",
				"tty-browserify": "npm:tty-browserify@0.0.0",
				"syntax-error": "npm:syntax-error@1.1.6",
				"util": "npm:util@0.10.3",
				"vm-browserify": "npm:vm-browserify@0.0.4",
				"url": "npm:url@0.11.0",
				"xtend": "npm:xtend@4.0.1",
				"assert": "npm:assert@1.3.0",
				"events": "npm:events@1.1.1",
				"deps-sort": "npm:deps-sort@2.0.0",
				"path-browserify": "npm:path-browserify@0.0.0",
				"duplexer2": "npm:duplexer2@0.1.4",
				"concat-stream": "npm:concat-stream@1.5.1",
				"console-browserify": "npm:console-browserify@1.1.0",
				"stream-http": "npm:stream-http@2.3.1",
				"crypto-browserify": "npm:crypto-browserify@3.11.0",
				"buffer": "npm:buffer@4.9.0",
				"through2": "npm:through2@2.0.1",
				"process": "npm:process@0.11.8",
				"querystring-es3": "npm:querystring-es3@0.2.1",
				"labeled-stream-splicer": "npm:labeled-stream-splicer@2.0.0",
				"insert-module-globals": "npm:insert-module-globals@7.0.1",
				"os-browserify": "npm:os-browserify@0.1.2",
				"glob": "npm:glob@5.0.15",
				"constants-browserify": "npm:constants-browserify@1.0.0",
				"inherits": "npm:inherits@2.0.1",
				"subarg": "npm:subarg@1.0.0",
				"module-deps": "npm:module-deps@4.0.7",
				"defined": "npm:defined@1.0.0",
				"browserify-zlib": "npm:browserify-zlib@0.1.4",
				"https-browserify": "npm:https-browserify@0.0.1",
				"has": "npm:has@1.0.1",
				"readable-stream": "npm:readable-stream@2.1.4",
				"stream-browserify": "npm:stream-browserify@2.0.1",
				"string_decoder": "npm:string_decoder@0.10.31",
				"domain-browser": "npm:domain-browser@1.1.7",
				"parents": "npm:parents@1.0.1",
				"shasum": "npm:shasum@1.0.2",
				"punycode": "npm:punycode@1.4.1",
				"resolve": "npm:resolve@1.1.7"
			}
		},
		"npm:browser-pack@6.0.1": {
			"map": {
				"JSONStream": "npm:JSONStream@1.1.4",
				"through2": "npm:through2@2.0.1",
				"defined": "npm:defined@1.0.0",
				"umd": "npm:umd@3.0.1",
				"combine-source-map": "npm:combine-source-map@0.7.2"
			}
		},
		"npm:assert@1.3.0": {
			"map": {
				"util": "npm:util@0.10.3"
			}
		},
		"npm:shell-quote@1.6.1": {
			"map": {
				"array-reduce": "npm:array-reduce@0.0.0",
				"jsonify": "npm:jsonify@0.0.0",
				"array-filter": "npm:array-filter@0.0.1",
				"array-map": "npm:array-map@0.0.0"
			}
		},
		"npm:syntax-error@1.1.6": {
			"map": {
				"acorn": "npm:acorn@2.7.0"
			}
		},
		"npm:vm-browserify@0.0.4": {
			"map": {
				"indexof": "npm:indexof@0.0.1"
			}
		},
		"npm:timers-browserify@1.4.2": {
			"map": {
				"process": "npm:process@0.11.8"
			}
		},
		"npm:url@0.11.0": {
			"map": {
				"querystring": "npm:querystring@0.2.0",
				"punycode": "npm:punycode@1.3.2"
			}
		},
		"npm:util@0.10.3": {
			"map": {
				"inherits": "npm:inherits@2.0.1"
			}
		},
		"npm:read-only-stream@2.0.0": {
			"map": {
				"readable-stream": "npm:readable-stream@2.1.4"
			}
		},
		"npm:concat-stream@1.5.1": {
			"map": {
				"readable-stream": "npm:readable-stream@2.0.6",
				"inherits": "npm:inherits@2.0.1",
				"typedarray": "npm:typedarray@0.0.6"
			}
		},
		"npm:deps-sort@2.0.0": {
			"map": {
				"JSONStream": "npm:JSONStream@1.1.4",
				"subarg": "npm:subarg@1.0.0",
				"through2": "npm:through2@2.0.1",
				"shasum": "npm:shasum@1.0.2"
			}
		},
		"npm:stream-http@2.3.1": {
			"map": {
				"xtend": "npm:xtend@4.0.1",
				"inherits": "npm:inherits@2.0.1",
				"readable-stream": "npm:readable-stream@2.1.4",
				"to-arraybuffer": "npm:to-arraybuffer@1.0.1",
				"builtin-status-codes": "npm:builtin-status-codes@2.0.0"
			}
		},
		"npm:duplexer2@0.1.4": {
			"map": {
				"readable-stream": "npm:readable-stream@2.1.4"
			}
		},
		"npm:crypto-browserify@3.11.0": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"browserify-sign": "npm:browserify-sign@4.0.0",
				"pbkdf2": "npm:pbkdf2@3.0.4",
				"browserify-cipher": "npm:browserify-cipher@1.0.0",
				"create-ecdh": "npm:create-ecdh@4.0.0",
				"create-hmac": "npm:create-hmac@1.1.4",
				"diffie-hellman": "npm:diffie-hellman@5.0.2",
				"public-encrypt": "npm:public-encrypt@4.0.0",
				"create-hash": "npm:create-hash@1.1.2",
				"randombytes": "npm:randombytes@2.0.3"
			}
		},
		"npm:through2@2.0.1": {
			"map": {
				"xtend": "npm:xtend@4.0.1",
				"readable-stream": "npm:readable-stream@2.0.6"
			}
		},
		"npm:labeled-stream-splicer@2.0.0": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"isarray": "npm:isarray@0.0.1",
				"stream-splicer": "npm:stream-splicer@2.0.0"
			}
		},
		"npm:insert-module-globals@7.0.1": {
			"map": {
				"JSONStream": "npm:JSONStream@1.1.4",
				"concat-stream": "npm:concat-stream@1.5.1",
				"process": "npm:process@0.11.8",
				"through2": "npm:through2@2.0.1",
				"xtend": "npm:xtend@4.0.1",
				"combine-source-map": "npm:combine-source-map@0.7.2",
				"is-buffer": "npm:is-buffer@1.1.4",
				"lexical-scope": "npm:lexical-scope@1.2.0"
			}
		},
		"npm:glob@5.0.15": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"once": "npm:once@1.3.3",
				"minimatch": "npm:minimatch@3.0.3",
				"path-is-absolute": "npm:path-is-absolute@1.0.0",
				"inflight": "npm:inflight@1.0.5"
			}
		},
		"npm:JSONStream@1.1.4": {
			"map": {
				"through": "npm:through@2.3.8",
				"jsonparse": "npm:jsonparse@1.2.0"
			}
		},
		"npm:module-deps@4.0.7": {
			"map": {
				"JSONStream": "npm:JSONStream@1.1.4",
				"browser-resolve": "npm:browser-resolve@1.11.2",
				"concat-stream": "npm:concat-stream@1.5.1",
				"defined": "npm:defined@1.0.0",
				"duplexer2": "npm:duplexer2@0.1.4",
				"subarg": "npm:subarg@1.0.0",
				"through2": "npm:through2@2.0.1",
				"xtend": "npm:xtend@4.0.1",
				"inherits": "npm:inherits@2.0.1",
				"parents": "npm:parents@1.0.1",
				"readable-stream": "npm:readable-stream@2.1.4",
				"resolve": "npm:resolve@1.1.7",
				"detective": "npm:detective@4.3.1",
				"stream-combiner2": "npm:stream-combiner2@1.1.1"
			}
		},
		"npm:browserify-zlib@0.1.4": {
			"map": {
				"readable-stream": "npm:readable-stream@2.1.4",
				"pako": "npm:pako@0.2.9"
			}
		},
		"npm:stream-browserify@2.0.1": {
			"map": {
				"readable-stream": "npm:readable-stream@2.1.4",
				"inherits": "npm:inherits@2.0.1"
			}
		},
		"npm:readable-stream@2.1.4": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"string_decoder": "npm:string_decoder@0.10.31",
				"isarray": "npm:isarray@1.0.0",
				"util-deprecate": "npm:util-deprecate@1.0.2",
				"buffer-shims": "npm:buffer-shims@1.0.0",
				"process-nextick-args": "npm:process-nextick-args@1.0.7",
				"core-util-is": "npm:core-util-is@1.0.2"
			}
		},
		"npm:browser-resolve@1.11.2": {
			"map": {
				"resolve": "npm:resolve@1.1.7"
			}
		},
		"npm:console-browserify@1.1.0": {
			"map": {
				"date-now": "npm:date-now@0.1.4"
			}
		},
		"npm:readable-stream@2.0.6": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"string_decoder": "npm:string_decoder@0.10.31",
				"isarray": "npm:isarray@1.0.0",
				"util-deprecate": "npm:util-deprecate@1.0.2",
				"process-nextick-args": "npm:process-nextick-args@1.0.7",
				"core-util-is": "npm:core-util-is@1.0.2"
			}
		},
		"npm:buffer@4.9.0": {
			"map": {
				"ieee754": "npm:ieee754@1.1.6",
				"isarray": "npm:isarray@1.0.0",
				"base64-js": "npm:base64-js@1.1.2"
			}
		},
		"npm:has@1.0.1": {
			"map": {
				"function-bind": "npm:function-bind@1.1.0"
			}
		},
		"npm:combine-source-map@0.7.2": {
			"map": {
				"source-map": "npm:source-map@0.5.6",
				"convert-source-map": "npm:convert-source-map@1.1.3",
				"lodash.memoize": "npm:lodash.memoize@3.0.4",
				"inline-source-map": "npm:inline-source-map@0.6.2"
			}
		},
		"npm:subarg@1.0.0": {
			"map": {
				"minimist": "npm:minimist@1.2.0"
			}
		},
		"npm:parents@1.0.1": {
			"map": {
				"path-platform": "npm:path-platform@0.11.15"
			}
		},
		"npm:shasum@1.0.2": {
			"map": {
				"json-stable-stringify": "npm:json-stable-stringify@0.0.1",
				"sha.js": "npm:sha.js@2.4.5"
			}
		},
		"npm:browserify-sign@4.0.0": {
			"map": {
				"create-hmac": "npm:create-hmac@1.1.4",
				"inherits": "npm:inherits@2.0.1",
				"create-hash": "npm:create-hash@1.1.2",
				"browserify-rsa": "npm:browserify-rsa@4.0.1",
				"bn.js": "npm:bn.js@4.11.6",
				"elliptic": "npm:elliptic@6.3.1",
				"parse-asn1": "npm:parse-asn1@5.0.0"
			}
		},
		"npm:pbkdf2@3.0.4": {
			"map": {
				"create-hmac": "npm:create-hmac@1.1.4"
			}
		},
		"npm:create-hmac@1.1.4": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"create-hash": "npm:create-hash@1.1.2"
			}
		},
		"npm:diffie-hellman@5.0.2": {
			"map": {
				"randombytes": "npm:randombytes@2.0.3",
				"bn.js": "npm:bn.js@4.11.6",
				"miller-rabin": "npm:miller-rabin@4.0.0"
			}
		},
		"npm:public-encrypt@4.0.0": {
			"map": {
				"create-hash": "npm:create-hash@1.1.2",
				"randombytes": "npm:randombytes@2.0.3",
				"browserify-rsa": "npm:browserify-rsa@4.0.1",
				"bn.js": "npm:bn.js@4.11.6",
				"parse-asn1": "npm:parse-asn1@5.0.0"
			}
		},
		"npm:create-hash@1.1.2": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"sha.js": "npm:sha.js@2.4.5",
				"cipher-base": "npm:cipher-base@1.0.2",
				"ripemd160": "npm:ripemd160@1.0.1"
			}
		},
		"npm:stream-splicer@2.0.0": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"readable-stream": "npm:readable-stream@2.1.4"
			}
		},
		"npm:detective@4.3.1": {
			"map": {
				"acorn": "npm:acorn@1.2.2",
				"defined": "npm:defined@1.0.0"
			}
		},
		"npm:inflight@1.0.5": {
			"map": {
				"once": "npm:once@1.3.3",
				"wrappy": "npm:wrappy@1.0.2"
			}
		},
		"npm:create-ecdh@4.0.0": {
			"map": {
				"bn.js": "npm:bn.js@4.11.6",
				"elliptic": "npm:elliptic@6.3.1"
			}
		},
		"npm:browserify-cipher@1.0.0": {
			"map": {
				"browserify-des": "npm:browserify-des@1.0.0",
				"browserify-aes": "npm:browserify-aes@1.0.6",
				"evp_bytestokey": "npm:evp_bytestokey@1.0.0"
			}
		},
		"npm:stream-combiner2@1.1.1": {
			"map": {
				"duplexer2": "npm:duplexer2@0.1.4",
				"readable-stream": "npm:readable-stream@2.1.4"
			}
		},
		"npm:json-stable-stringify@0.0.1": {
			"map": {
				"jsonify": "npm:jsonify@0.0.0"
			}
		},
		"npm:lexical-scope@1.2.0": {
			"map": {
				"astw": "npm:astw@2.0.0"
			}
		},
		"npm:once@1.3.3": {
			"map": {
				"wrappy": "npm:wrappy@1.0.2"
			}
		},
		"npm:sha.js@2.4.5": {
			"map": {
				"inherits": "npm:inherits@2.0.1"
			}
		},
		"npm:browserify-rsa@4.0.1": {
			"map": {
				"bn.js": "npm:bn.js@4.11.6",
				"randombytes": "npm:randombytes@2.0.3"
			}
		},
		"npm:elliptic@6.3.1": {
			"map": {
				"bn.js": "npm:bn.js@4.11.6",
				"inherits": "npm:inherits@2.0.1",
				"brorand": "npm:brorand@1.0.5",
				"hash.js": "npm:hash.js@1.0.3"
			}
		},
		"npm:browserify-des@1.0.0": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"cipher-base": "npm:cipher-base@1.0.2",
				"des.js": "npm:des.js@1.0.0"
			}
		},
		"npm:browserify-aes@1.0.6": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"create-hash": "npm:create-hash@1.1.2",
				"cipher-base": "npm:cipher-base@1.0.2",
				"evp_bytestokey": "npm:evp_bytestokey@1.0.0",
				"buffer-xor": "npm:buffer-xor@1.0.3"
			}
		},
		"npm:minimatch@3.0.3": {
			"map": {
				"brace-expansion": "npm:brace-expansion@1.1.6"
			}
		},
		"npm:inline-source-map@0.6.2": {
			"map": {
				"source-map": "npm:source-map@0.5.6"
			}
		},
		"npm:cipher-base@1.0.2": {
			"map": {
				"inherits": "npm:inherits@2.0.1"
			}
		},
		"npm:astw@2.0.0": {
			"map": {
				"acorn": "npm:acorn@1.2.2"
			}
		},
		"npm:miller-rabin@4.0.0": {
			"map": {
				"bn.js": "npm:bn.js@4.11.6",
				"brorand": "npm:brorand@1.0.5"
			}
		},
		"npm:evp_bytestokey@1.0.0": {
			"map": {
				"create-hash": "npm:create-hash@1.1.2"
			}
		},
		"npm:parse-asn1@5.0.0": {
			"map": {
				"browserify-aes": "npm:browserify-aes@1.0.6",
				"create-hash": "npm:create-hash@1.1.2",
				"evp_bytestokey": "npm:evp_bytestokey@1.0.0",
				"pbkdf2": "npm:pbkdf2@3.0.4",
				"asn1.js": "npm:asn1.js@4.8.0"
			}
		},
		"npm:des.js@1.0.0": {
			"map": {
				"inherits": "npm:inherits@2.0.1",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0"
			}
		},
		"npm:hash.js@1.0.3": {
			"map": {
				"inherits": "npm:inherits@2.0.1"
			}
		},
		"npm:brace-expansion@1.1.6": {
			"map": {
				"balanced-match": "npm:balanced-match@0.4.2",
				"concat-map": "npm:concat-map@0.0.1"
			}
		},
		"npm:asn1.js@4.8.0": {
			"map": {
				"bn.js": "npm:bn.js@4.11.6",
				"inherits": "npm:inherits@2.0.1",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0"
			}
		},
		"npm:jspm-nodelibs-crypto@0.2.0": {
			"map": {
				"crypto-browserify": "npm:crypto-browserify@3.11.0"
			}
		},
		"npm:jspm-nodelibs-http@0.2.0": {
			"map": {
				"http-browserify": "npm:stream-http@2.3.1"
			}
		},
		"npm:jspm-nodelibs-os@0.2.0": {
			"map": {
				"os-browserify": "npm:os-browserify@0.2.1"
			}
		},
		"npm:jspm-nodelibs-string_decoder@0.2.0": {
			"map": {
				"string_decoder-browserify": "npm:string_decoder@0.10.31"
			}
		},
		"npm:jspm-nodelibs-stream@0.2.0": {
			"map": {
				"stream-browserify": "npm:stream-browserify@2.0.1"
			}
		},
		"npm:jspm-nodelibs-zlib@0.2.0": {
			"map": {
				"zlib-browserify": "npm:browserify-zlib@0.1.4"
			}
		},
		"npm:jspm-nodelibs-buffer@0.2.0": {
			"map": {
				"buffer-browserify": "npm:buffer@4.9.0"
			}
		},
		"npm:jspm-nodelibs-punycode@0.2.0": {
			"map": {
				"punycode-browserify": "npm:punycode@1.4.1"
			}
		},
		"npm:jspm-nodelibs-timers@0.2.0": {
			"map": {
				"timers-browserify": "npm:timers-browserify@1.4.2"
			}
		},
		"npm:jspm-nodelibs-domain@0.2.0": {
			"map": {
				"domain-browserify": "npm:domain-browser@1.1.7"
			}
		},
		"npm:jspm-nodelibs-url@0.2.0": {
			"map": {
				"url-browserify": "npm:url@0.11.0"
			}
		}
	}
});
