var ValueModel = require("./main-view-model").ValueModel;

var page;

exports.onPageLoaded = function(args) {
    console.log("Carregando página...");
    page = args.object;
    page.bindingContext = new ValueModel();

    console.log(JSON.stringify(page.bindingContext));
}