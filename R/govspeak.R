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
      fig_width=960 / 72,
      fig_height=640 / 72,
      dpi = 72,
      fig_path = "images/",
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

#' Convert markdown file to Whitehall Publisher (GOV.UK) govspeak markdown format
#' @param path string; filename (including path) to *.md file for conversion
#' @param images_folder string; folder containing images for *.md file. Defaults
#'   to "images"
#' @param remove_blocks bool; decision to remove block elements from *.md file.
#'   This includes code blocks and warnings
#' @export
#' @name convert_md
#' @title Convert standard markdown file to govspeak
convert_md <- function(path, images_folder = "images", remove_blocks=TRUE) {
  govspeak_file <- paste(readLines(path), collapse = "\n")

  img_files <- list.files(paste0(dirname(path), "/", images_folder))

  if (length(img_files) > 0) {
    image_references <- tibble::tibble(image = sort(img_files), id = paste0('!!', 1:length(img_files)))
    write.csv(image_references, paste0(dirname(path), "/", 'images.csv'), row.names = FALSE)

    govspeak_file <- convert_image_references(image_references, govspeak_file, images_folder)
  }


  govspeak_file <- remove_header(govspeak_file)

  govspeak_file <- convert_callouts(govspeak_file)

  if (remove_blocks) {
    govspeak_file <- remove_rmd_blocks(govspeak_file)
  }

  write(govspeak_file, gsub("\\.knit.md", "_govspeak\\.md", path))
}

#' Convert markdown image references to govspeak format (!!n)
#' @param image_references dataframe of image file names and associated govdown
#'   reference.
#' @param md_file string with markdown file text
#' @param images_folder string; folder containing images for *.md file
#' @name convert_image_references
#' @title Convert markdown image references to govdown
convert_image_references <- function(image_references, md_file, images_folder) {
  govspeak_image_reference_file <- as.character(md_file)
  for (i in 1:nrow(image_references)) {
    file_name <- image_references$image[i]
print(i)
print(file_name)
    # Construct markdown reference to image file
    # ![](images/1-abc-1.png)<!-- -->!
    md_image_format <- paste0("!\\[\\]\\(", images_folder, "/", file_name, "\\)<!-- -->")
print(md_image_format)
    govspeak_reference <- paste0(as.character(image_references$id[i]), "\n")

    # Replace markdown image reference with govspeak reference
    govspeak_image_reference_file <- gsub(md_image_format, govspeak_reference, govspeak_image_reference_file)
  }

  return(govspeak_image_reference_file)
}


#' Convert markdown callout syntax to govspeak
#' @param md_file string; markdown file text
#' @name convert_callouts
#' @title Convert markdown callout syntax to govspeak
convert_callouts <- function(md_file) {
  # Lazy match on lines starting with ">", which are then flanked with "^"
  # Currently only catches single line callouts
  converted_md_file <- gsub("(\\n)>[ ]*(.*?\\n)", "\\1^\\2", md_file)
}


#' Replace R markdown header with title only
#' @param md_file string; markdown file text
#' @name remove_header
#' @title Replace R markdown header with ## title
remove_header <- function(md_file) {
  # Lazy match on header to extract title
  # Remove substitution if titles must be entered manually
  cleaned_md_file <- gsub("---\\n.*?---\\n", "", md_file)
  return(cleaned_md_file)
}


#' Remove R markdown multiline block elements (package warnings, but also multiline code blocks)
#' @param md_file string; markdown file text
#' @name remove_rmd_blocks
#' @title Remove R markdown multiline block elements (package warning and code block)
remove_rmd_blocks <- function(md_file) {
  # Lazy match on warnings and code blocks
  cleaned_md_file <- gsub("```.*?```", "", md_file)
  return(cleaned_md_file)
}
