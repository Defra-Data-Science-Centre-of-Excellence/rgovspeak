## Shared HTML template function

html_template <- function(template_name, template_path, template_dependencies, pandoc_args = NULL, ...) {

    args <- list(...)
    ## For compatibility with pkgdown
    args$template <- NULL

    # js and css dependencies
    extra_dependencies <- c(list(rmarkdown::html_dependency_jquery()), template_dependencies)

    # Merge "extra_dependencies"
    if ("extra_dependencies" %in% names(args)) {
        extra_dependencies <- append(extra_dependencies, args[["extra_dependencies"]])
        args[["extra_dependencies"]] <- NULL
        #args[["mathjax"]] <- NULL
    }

    ## Other arguments
    govuk_lua <- pkg_file("templates/govspeak_html/govuk.lua")
    pandoc_args <- c(pandoc_args, "--variable", paste0(template_name, ":true"), "--lua-filter", govuk_lua)

    ## Call rmarkdown::html_document
    html_document_args <- list(
        template = system.file(template_path, package = "rgovspeak"),
        extra_dependencies = extra_dependencies,
        pandoc_args = pandoc_args
    )

    html_document_args <- append(html_document_args, args)
    html_document_func <- rmarkdown::html_document

    do.call(html_document_func, html_document_args)

}
