using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(HelloReactJs.ReactConfig), "Configure")]

namespace HelloReactJs
{
    // modify App_Start\ReactConfig.cs to tell ReactJS.NET which JavaScript files it requires for the server-side rendering
    public static class ReactConfig
	{
        public static void Configure()
		{
            // If you want to use server-side rendering of React components, 
            // add all the necessary JavaScript files here. This includes 
            // your components as well as all of their dependencies.
            // See http://reactjs.net/ for more information. Example:
            //ReactSiteConfiguration.Configuration
            //	.AddScript("~/Scripts/First.jsx")
            //	.AddScript("~/Scripts/Second.jsx");

            // If you use an external build too (for example, Babel, Webpack,
            // Browserify or Gulp), you can improve performance by disabling 
            // ReactJS.NET's version of Babel and loading the pre-transpiled 
            // scripts. Example:
            //ReactSiteConfiguration.Configuration
            //	.SetLoadBabel(false)
            //	.AddScriptWithoutTransform("~/Scripts/bundle.server.js")

            ReactSiteConfiguration.Configuration
                .AddScript("~/Scripts/showdown.js")
                .AddScript("~/Scripts/Tutorial.jsx");
        }
	}
}