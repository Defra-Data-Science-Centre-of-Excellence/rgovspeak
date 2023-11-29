# This function converts GovSpeak markup language to HTML.
#' @export
govspeak <- function(
    image_type = "svg",
    fig_width = 960 / 72,
    fig_height = 640 / 72,
    dpi = 72,
    dev = "svg",
    pandoc_args = NULL,
    ...) {

  # dependencies
  extra_dependencies <- list(
    govspeak_dependency(),
    application_js_dependency(),
    html_dependency_jquery(),
    html_dependency_jqueryui(),
    html_dependency_tocify()
  )

  # template path
  template_file <- pkg_file("templates/template.html")
  govuk_lua <- pkg_file("templates/govspeak/govuk.lua")
  chart_filter <- pkg_file("templates/govspeak/chart_filter.lua")
  pandoc_args <- c(pandoc_args, "--template", template_file, "--lua-filter", govuk_lua, "--lua-filter", chart_filter)

  # knitr options
  knitr_options <- knitr_options_html(fig_width, fig_height, NULL, TRUE, dev = image_type)
  knitr_options$opts_chunk <- append(knitr_options$opts_chunk, knitr::opts_chunk$set(fig.process = rename_images))

  # despite specifying keep_md in knitr_options it does not get picked up, so set it here
  rmarkdown::output_format(
    knitr = knitr_options,
    pandoc = pandoc_options(to = "html", args = pandoc_args),
    keep_md = TRUE,
    base_format = html_document_base(
      template_name = "govspeak",
      template = pkg_file("templates/template.html"),
      template_dependencies = list(govspeak_dependency()),
      extra_dependencies = extra_dependencies,
      pandoc_args = pandoc_args,
      ...
    )
  )
}

#' Function to create a HTML dependency for Govspeak templates
#'
#' This function creates a HTML dependency for Govspeak templates, which includes the name, version,
#' source, and stylesheet.
#' @return A HTML dependency object for Govspeak templates
#' @export
govspeak_dependency <- function() {
  htmltools::htmlDependency(
    name = "govspeak",
    version = "0.1",
    src = system.file("templates/govspeak", package = "rgovspeak2"),
    stylesheet = c("application.css", "application2.css", "toc.css")
  )
}

#' Function to add application.js as a dependency
#'
#' This function adds application.js as a dependency in an HTML document.
#' @return A HTML dependency object for application.js
#' @export
application_js_dependency <- function(path) {
  htmltools::htmlDependency(
    name = "application.js",
    version = "1.0",
    src = system.file("templates/govspeak", package = "rgovspeak2"),
    script = "application.js"
  )
}

# This function renames images by removing the "-number" suffix from the filename.
# It then moves the file to the new filename and returns the new filename if the file exists.
rename_images <- function(filename) {
  new_filename <- stringr::str_remove(string = filename, pattern = "-\\d+(?=\\.)")
  fs::file_move(path = filename, new_path = new_filename)
  ifelse(fs::file_exists(new_filename), new_filename, filename)
}

# locations of resource files in the package
#' Function to get the file path of a resource file in the package
#'
#' @param ... additional path components to the resource file
#' @return the file path of the resource file
#' @export
pkg_file <- function(...) {
  system.file(..., package = "rgovspeak2", mustWork = TRUE)
}
