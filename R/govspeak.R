#' @title FUNCTION_TITLE
#' @description FUNCTION_DESCRIPTION
#' @param fig_width PARAM_DESCRIPTION, Default: 960/72
#' @param fig_height PARAM_DESCRIPTION, Default: 640/72
#' @param fig_caption PARAM_DESCRIPTION, Default: TRUE
#' @param dpi PARAM_DESCRIPTION, Default: 72
#' @param toc PARAM_DESCRIPTION, Default: TRUE
#' @param ... PARAM_DESCRIPTION
#' @return OUTPUT_DESCRIPTION
#' @details DETAILS
#' @examples
#' \dontrun{
#' if(interactive()){
#'  #EXAMPLE1
#'  }
#' }
#' @rdname govspeak
#' @export
govspeak <- function(...) {
    html_template(
        template_name = "govespeak_html",
        template_path = "templates/template.html",
        template_dependencies = list(html_dependency_govspeak()),
        fig_width = 960 / 72,
        fig_height = 640 / 72,
        fig_caption = TRUE,
        dpi = 72,
        toc = TRUE,
        toc_depth = 3,
        keep_md = TRUE,
        mathjax = NULL,
        ...
    )
}

# html js and css
html_dependency_govspeak <- function() {
  htmltools::htmlDependency(name = "govspeak",
                 version = "0.1",
                 src = system.file("templates/govspeak_html", package = "rgovspeak"),
                 stylesheet = c("application.css", 'application2.css', 'toc.css'))

}

# locations of resource files in the package
pkg_file <- function(...) {
  system.file(..., package = "rgovspeak", mustWork = TRUE)
}
