import React from 'react';
import { Provider } from 'react-redux';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import App from '../App';
import Home from '../Home';
import store from '../store';
import BondCardMenu from '../components/src/bondcard/BondCardMenu';

var GLOBAL = require('../config/global');

console.log("hello");


var helloAppService = SYMPHONY.services.register("tradeokblt:app");
window.shareService = null;

var $ = require('jquery');

SYMPHONY.remote.hello().then(function(data) {

    // Set the theme of the app module
    var themeColor = data.themeV2.name;
    var themeSize = data.themeV2.size;
    // You must add the symphony-external-app class to the body element
    document.body.className = "symphony-external-app " + themeColor + " " + themeSize;

    SYMPHONY.application.connect("tradeokblt", ["modules", "applications-nav", "ui", "share"], ["tradeokblt:app"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user. 
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;
        
        // Subscribe required
        var uiService = SYMPHONY.services.subscribe("ui");

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        window.shareService = SYMPHONY.services.subscribe("share");



        // UI: Listen for theme change events
        uiService.listen("themeChangeV2", function() {
            SYMPHONY.remote.hello().then(function(theme) {
                themeColor = theme.themeV2.name;
                themeSize = theme.themeV2.size;
                document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
            });
        });

        // MODULE: Add a menu item to our module
        modulesService.addMenuItem("tradeokblt", "About TradeOKBlt App", "tradeokblt-menu-item");
        modulesService.setHandler("tradeokblt", "tradeokblt:app");


        // LEFT NAV: Update the left navigation item's badge count when the "Increment Unread Badge Count" button is clicked using the navService's count method.
        var incrementButton = document.getElementById("increment");
        var count = 0;
        // Bind a click event handler
        incrementButton.addEventListener("click", function(){
            count++;
            navService.count("tradeokblt-nav", count);
        });

        // MODULE: Hide the main module when the "Hide Main App Module" button is clicked
        var hideButton = document.getElementById("hide");
        hideButton.addEventListener("click", function() {
            // Note that this will not close any modules opened in context of cashtags or articles since we are specifying the main app module's id
            modulesService.hide("tradeokblt");
        });

        // MODULE: Change the title of the main module when the "Change Main App Module Title" button is clicked
        var setTitleButton = document.getElementById("set-title");
        setTitleButton.addEventListener("click", function() {
            // Note that this will not change the title of any modules opened in context of cashtags or articles since we are specifying the main app module's id
            modulesService.setTitle("tradeokblt", "New Module Title");
        });

        // LEFT NAV: Remove the left navigation item ("Removable Left Nav Item") when the "Remove Left Nav Item" button is clicked
        var removeLeftNavItemButton = document.getElementById("remove-left-nav-item");
        removeLeftNavItemButton.addEventListener("click", function() {
            // Note that this will not remove all left navigation items created by the application - only the one with the specified id
            // After removing the "Removable Left Nav Item" once, you will need to remove and reinstall the app to bring it back
            navService.remove('tradeokblt-nav-remove');
        });

        // LEFT NAV: Rename the left navigation item ("tradeokblt-nav") when the "Rename Left Nav Item" button is clicked
        var renameLeftNavItemButton = document.getElementById("rename-left-nav-item");
        renameLeftNavItemButton.addEventListener("click", function() {
            // Note that this will not rename all left navigation items created by the application - only the one with the specified id
            navService.rename('tradeokblt-nav', 'New Left Nav Title');
        });

        // UI: Remove the Room UI extension button when the "Unregister Room UI Extension" button is clicked
        var unregisterRoomExtensionButton = document.getElementById("unregister-room-extension");
        unregisterRoomExtensionButton.addEventListener("click", function() {
            // Note that this will not remove all UI extensions
            // This will remove only the extension of a given ID ('tradeokblt-room') for a given class ('room')
            uiService.unregisterExtension('room', 'tradeokblt-room');
        });

        // SHARE: Trigger Symphony's share modal when the "Share" button is clicked
        var shareButton = document.getElementById("share");
        // Convert the datestring (07 June 2016) to Unix timestamp for the share service
        var articleUnixTimestamp = (new Date(document.getElementById("article-date").innerHTML).getTime())/1000;
        var articleOptions = {
            "title": document.getElementById("article-title").innerHTML,
            "subTitle": document.getElementById("article-subtitle").innerHTML,
            "blurb": document.getElementById("article-blurb").innerHTML,
            "date": articleUnixTimestamp,
            "publisher": document.getElementById("article-publisher").innerHTML,
            "author": document.getElementById("article-author").innerHTML,
            "thumbnail": document.getElementById("article-thumbnail").src,
            // In this case, the shared article has an ID, which is used to deeplink back into our application
            "id": document.getElementById("article-id").innerHTML               
        };
        shareButton.addEventListener("click", function(){
            shareService.share(
                "article",
                articleOptions
            );
        });

        var shareButton2 = document.getElementById("share-2");
        var articleUnixTimestamp2 = (new Date(document.getElementById("article-date-2").innerHTML).getTime())/1000;
        var articleOptions2 = {
            "title": document.getElementById("article-title-2").innerHTML,
            "subTitle": document.getElementById("article-subtitle-2").innerHTML,
            "blurb": document.getElementById("article-blurb-2").innerHTML,
            "date": articleUnixTimestamp2,
            "publisher": document.getElementById("article-publisher-2").innerHTML,
            "author": document.getElementById("article-author-2").innerHTML,
            "thumbnail": document.getElementById("article-thumbnail-2").src,
            // In this case, the shared article has an href link, which should be opened in a new browser window
            "href": document.getElementById("article-link-2").href    
        };
        shareButton2.addEventListener("click", function(){
            shareService.share(
                "article",
                articleOptions2
            );
        });

        // LINKS: Open a link using the openLink() method on the modules service. Links should be opened using this method rather than <a href="..." target="_blank">...</a>.
        var linkButton = document.getElementById("link");
        linkButton.addEventListener("click", function(){
            modulesService.openLink("https://www.google.com");
        });


        // UI CASHTAG: If the app is opened in the context of a cashtag, show the cashtag in the text box on the app.
        // window.location.search returns the querystring part of a URL. Use substring to omit the leading ?.
        var querystring = window.location.search.substring(1);
        // Use regex to check if the querystring includes "cashtag"
        if (querystring && /cashtag/.test(querystring)) {
            // Split the querystring into a list of pairs
            var urlParams = querystring.split('&');
            for (var i = 0; i < urlParams.length; i++) {
                var pair = urlParams[i].split('=');
                // Check if the key of one of the pairs is cashtag (there should always be such a pair)
                if(pair[0] == 'cashtag') {
                    // Use substring to omit the leading "%24" (url encoding of $)
                    var cashtag = pair[1].substring(3);
                    document.getElementById("cashtag").value = cashtag;
                }
            }
        } 
        // SHARE: If the app is opened in the context of an article, show the articleId in the text box on the app.
        // @TODO(anjana): Refactor this redundant code
        else if (querystring && /article/.test(querystring)) {
            var urlParams = querystring.split('&');
            for (var i = 0; i < urlParams.length; i++) {
                var pair = urlParams[i].split('=');
                if(pair[0] == 'article') {
                    var articleId = pair[1];
                    document.getElementById("article").value = articleId;
                }
            }
        }

        // Implement methods on the application module service
        helloAppService.implement({
            // If the menu item is selected, display the About text 
            menuSelect: function(itemId) {
                if (itemId == "tradeokblt-menu-item") {
                    document.getElementById("about-tradeokblt-world-app").className = "";
                }
            }
        });
    }.bind(this))
}.bind(this));


export default (

<Provider store={store} >

  
  <Router history={browserHistory}>
    <Route path="/app.html" component={App}>
      <IndexRoute component={BondCardMenu}  params={{ jjw: "124" }} />
      <Route path="/home" component={Home}  />
      <Route path="/BondCardMenu" component={BondCardMenu}  />
    </Route>
  </Router>
  </Provider>

);
