app.Router = Backbone.Router.extend();

// ----------------------------------
// Init and config
// ----------------------------------

app.Router.prototype.initialize = function()
{
    console.log(":: init app.Router");

    var that = this;

    // Init menus and main view here
   
    new app.views.MainPage({ el: $('body'), router: this});
    
    
};

app.Router.prototype.routes = {
    ''                                      : 'defaultPage',
    'home/*path'                            : 'defaultPage',
    '*others'                               : 'error404'
};

app.Router.prototype.error404 = function()
{
    var that = this;
    new app.views.Modal({
        content: '<h2 class="alert alert-error">Page introuvable.</h2>',
        callback: function(){
            that.navigate('', {trigger:true});
        }
    });
};

// ----------------------------------
// Routes
// ----------------------------------

app.Router.prototype.defaultPage = function()
{
    this.home();
};

app.Router.prototype.home = function()
{
    new app.views.Home({
        el: $('#content')
    });
};
