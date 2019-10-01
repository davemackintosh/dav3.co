"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var base_app_1 = require("@components/base-app/base-app");
var router_1 = require("@components/router");
var nav_1 = require("@src/shared/components/nav/nav");
var global_1 = require("@src/shared/theme/global");
var main_1 = require("@src/shared/theme/main");
var en_gb_1 = require("@translations/en-gb");
var fs_1 = require("fs");
var path_1 = require("path");
var react_1 = require("react");
var server_1 = require("react-dom/server");
var react_hot_loader_1 = require("react-hot-loader");
var react_intl_1 = require("react-intl");
var react_router_1 = require("react-router");
var styled_components_1 = require("styled-components");
var routes_1 = require("../routes");
var _config_1 = require("@config");
var react_helmet_1 = require("react-helmet");
var html_minifier_1 = require("html-minifier");
var footer_1 = require("@src/shared/components/footer/footer");
/**
 * Get a list of unique content from all
 * the content available so we can render
 * each page.
 *
 * @param {ContentProps[]} posts to get tags for.
 * @return {string[]} array of unique content.
 */
function collectUniqueMappedContent(content, parameter) {
    var tags = content.reduce(function (workingTags, post) {
        if (post.frontmatter[parameter]) {
            return workingTags.concat(post.frontmatter[parameter]);
        }
        return workingTags;
    }, []);
    return Array.from(new Set(tags)); // De-dupe
}
exports.collectUniqueMappedContent = collectUniqueMappedContent;
/**
 * Separate the content based on whether the
 * path contains any parameters or not
 *
 * @param {RouteProps[]} routes to separate.
 * @returns {{separated: RouteProps[], normal: RouteProps[]}} categorised content.
 */
function separateParameterisedRoutes(routes) {
    var separatedContent = {
        parameterised: [],
        normal: [],
        paginated: []
    };
    routes.forEach(function (route) {
        route.path = route.path.toLowerCase();
        if (route.paginated) {
            separatedContent.paginated.push(route);
        }
        else if (route.path && route.path.includes(":")) {
            separatedContent.parameterised.push(route);
        }
        else {
            separatedContent.normal.push(route);
        }
    });
    return separatedContent;
}
exports.separateParameterisedRoutes = separateParameterisedRoutes;
/**
 * Write the WritableContentObject to a file as html
 *
 * @param {WritableContentObject} content to write to a file.
 */
function writeContentToFile(content) {
    var htmlMarkup = fs_1.readFileSync(path_1.resolve(process.cwd(), "./dist/index.html"))
        .toString()
        .replace(/<title>.*<\/title>/gi, content.meta.title.toString())
        .replace("</title>", "</title>" + content.meta.meta)
        .replace("</head>", content.styles + "</head>")
        .replace("</head>", content.meta.link + "</head>")
        .replace(/.*<script.*><\/script>.*/gi, content.body);
    var minifiedMarkup = html_minifier_1.minify(htmlMarkup, {
        removeTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true
    });
    fs_1.mkdirSync(path_1.dirname(content.path), { recursive: true });
    console.log("Writing %s", content.path); // eslint-disable-line no-console
    fs_1.writeFileSync(content.path, minifiedMarkup);
}
exports.writeContentToFile = writeContentToFile;
function getRenderableContent(config, route) {
    var stylesheet = new styled_components_1.ServerStyleSheet();
    var renderedApp = {
        path: config.target + route.path.toLowerCase() + "/index.html",
        body: server_1.renderToString(stylesheet.collectStyles(<react_hot_loader_1.AppContainer>
          <react_intl_1.IntlProvider locale="en-gb" messages={en_gb_1["default"]}>
            <react_router_1.StaticRouter location={route.path} context={{}}>
              <react_1.Fragment>
                <global_1.GlobalStyle />
                <nav_1["default"] pages={routes_1.pages}/>
                <main_1.Main id="content">
                  <router_1["default"] routes={routes_1.routes}/>
                  <base_app_1["default"] />
                </main_1.Main>
                <footer_1["default"] />
              </react_1.Fragment>
            </react_router_1.StaticRouter>
          </react_intl_1.IntlProvider>
        </react_hot_loader_1.AppContainer>)),
        styles: stylesheet.getStyleTags(),
        meta: react_helmet_1["default"].renderStatic()
    };
    stylesheet.seal();
    return renderedApp;
}
exports.getRenderableContent = getRenderableContent;
function getRenderableRSSContent(config, content) {
    return "<?xml version=\"1.0\"?>\n<rss version= \"2.0\">\n  <channel>\n  " + content
        .filter(function (targetContent) {
        return targetContent.frontmatter.status !== "draft" &&
            targetContent.frontmatter.published !== "false";
    })
        .map(function (targetContent) {
        var title = targetContent.frontmatter.title;
        var description = targetContent.frontmatter.excerpt;
        var link = config.baseUrl + "/blog/" + path_1.basename(targetContent.contentPath.toLowerCase(), ".md");
        return "<item>\n          <title>" + title + "</title>\n          <description>" + description + "</description>\n          <link>" + link + "/</link>\n        </item>";
    })
        .join("\n") + "\n  </channel>\n</rss>\n";
}
exports.getRenderableRSSContent = getRenderableRSSContent;
function getRenderableSiteMapContent(config, content) {
    return "<?xml version=\"1.0\"?>\n  <urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  " + content
        .map(function (targetContent) {
        var loc = targetContent.path
            .replace(config.target, config.baseUrl)
            .replace("/index.html", "");
        return "<url>\n          <changefreq>weekly</changefreq>\n          <loc>" + loc + "</loc>\n        </url>";
    })
        .join("\n") + "\n</urlset>\n";
}
exports.getRenderableSiteMapContent = getRenderableSiteMapContent;
function BuildStatic(config) {
    fs_1.mkdirSync(config.target, { recursive: true });
    // Collect information on the content so we can
    // do the right work with the right data at the
    // right time.
    var separatedContent = separateParameterisedRoutes(routes_1.routes);
    // Create the content for the normal content first.
    var writableContent = separatedContent.normal.map(function (route) {
        return getRenderableContent(config, route);
    });
    // Write these pages.
    writableContent.forEach(writeContentToFile);
    var parameterisedContent = Object.keys(_config_1.siteConfig.parameterMap).reduce(function (out, currentParameter) {
        var targetFrontmatter = _config_1.siteConfig.parameterMap[currentParameter];
        var targetRoute = (_config_1.siteConfig.routes || []).find(function (route) {
            return (route.path || "").includes(currentParameter);
        });
        var targetContent = collectUniqueMappedContent(routes_1.posts, targetFrontmatter);
        if (!targetRoute)
            return out;
        return out.concat(targetContent.map(function (value) {
            var modifiedRoute = __assign(__assign({}, targetRoute), { path: targetRoute.path.replace(new RegExp(currentParameter), value) });
            return getRenderableContent(config, modifiedRoute);
        }));
    }, []);
    // Write these pages.
    parameterisedContent.forEach(writeContentToFile);
    // Write paginated lists.
    var perPage = _config_1.siteConfig.postsPerPage || 10;
    var pages = Math.ceil(routes_1.posts.length / perPage);
    var writablePages = separatedContent.paginated.reduce(function (out, route) {
        for (var page = 0; page < pages; page += 1) {
            var modifiedRoute = __assign(__assign({}, route), { path: route.path.replace(":page", page.toString()) });
            out.push(getRenderableContent(config, modifiedRoute));
        }
        return out;
    }, []);
    writablePages.forEach(writeContentToFile);
    if (_config_1.siteConfig.rss) {
        var rssFeed = getRenderableRSSContent(config, routes_1.posts);
        console.log("Writing: %s", config.target + "/rss.xml"); // eslint-disable-line no-console
        fs_1.writeFileSync(config.target + "/rss.xml", rssFeed);
    }
    var sitemap = getRenderableSiteMapContent(config, __spreadArrays(writableContent, writablePages, parameterisedContent));
    console.log("Writing: %s", config.target + "/sitemap.xml"); // eslint-disable-line no-console
    fs_1.writeFileSync(config.target + "/sitemap.xml", sitemap);
}
exports["default"] = BuildStatic;
BuildStatic({
    target: path_1.resolve(process.cwd(), "./build"),
    baseUrl: "https://dav3.co"
});
