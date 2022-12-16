## Shared HTML template function

html_template <- function(template_name, template_path, template_dependencies, pandoc_args = NULL, ...) {

    args <- list(...)
    print(args)

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
    pandoc_args <- c(pandoc_args, "--lua-filter", govuk_lua)

    ## Call rmarkdown::html_document
    html_document_args <- list(
        template = system.file(template_path, package = "rgovspeak"),
        extra_dependencies = extra_dependencies,
        pandoc_args = pandoc_args
    )

    html_document_args <- append(html_document_args, args)
    html_document_func <- rmarkdown::html_document

    format <- do.call(html_document_func, html_document_args)

    # Set our knitter options here as not all of those passed as args to govspeak() will be read
    format$pre_knit <- function(input_file) {
        # Get the environment that contains the knitr options
        frames <- sys.frames()
        e <- frames[[length(frames) - 1]]

        # Set our options to output the correct image sizes and remove blocks from the md file
        e$output_format$knitr$opts_chunk$dpi <- args$dpi
        e$output_format$knitr$opts_chunk <- append(e$output_format$knitr$opts_chunk,
                                                   list(fig.path = args$fig_path,
                                                        echo = FALSE,
                                                        cache = FALSE,
                                                        warning = FALSE,
                                                        message = FALSE))

    }

    # Add post processor to convert the markdown to govspeak
    format$post_processor <- function(metadata, input_file, output_file, clean, verbose) {
        convert_md(input_file, remove_blocks = TRUE)

        # Get the contents of the output file and write it to the new location
        file_name <- output_file
        output_file <- paste(readLines(output_file), collapse = "\n")
        write(output_file, fs::path("output", file_name))

        # remove intermediary files
        unlink(input_file)
        unlink(file_name)

        # return the new output_file for preview
        fs::path("output", file_name)
    }

    format
}
