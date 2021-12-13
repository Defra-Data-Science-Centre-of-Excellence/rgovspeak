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
        keep_md = FALSE,
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
  md_file <- paste(readLines(path), collapse = "\n")

  img_files <- list.files(paste0(dirname(path), "/", images_folder))

  image_references <- generate_image_references(img_files)
  govspeak_file <- convert_image_references(image_references, md_file, images_folder)

  govspeak_file <- remove_header(govspeak_file)

  govspeak_file <- convert_callouts(govspeak_file)

  if (remove_blocks) {
    govspeak_file <- remove_rmd_blocks(govspeak_file)
  }

  write(govspeak_file, gsub("\\.knit.md", "_govspeak\\.md", path))
}

#' Converts image file names to a dataframe, with a field containing the
#' original image name and corresponding govdown reference
#' @param img_filenames character vector of files to be referenced in govdown format
#'   (!!n). The filename must start and end with a number and have text in
#'   between (eg, "1-abcd-1.png")
#' @name generate_image_references
#' @title Generate govdown image references
generate_image_references <- function(img_filenames) {
  image_references <- data.frame(image_file = img_filenames)
  # Strip ext - not image file specific
  image_references$image_reference <- tools::file_path_sans_ext(image_references$image_file)

  # Capture chunk number and image position within chunk
  if (!all(as.logical(lapply(image_references$image_file, stringr::str_detect, "^[0-9]")))) {
    stop("image chunk names must start with a number, which should correspond to their order in the .Rmd file")
  }

  image_references$pre_dec <- gsub("([0-9]+).*$", "\\1", image_references$image_reference)
  image_references$post_dec <- gsub(".*([0-9]+)$", "\\1", image_references$image_reference)

  # Convert to decimal for ranking
  image_references$combined <- as.numeric(paste0(image_references$pre_dec, ".", image_references$post_dec))
  image_references$image_reference <- paste0("!!", rank(image_references$combined))

  # Keep mapping of image files to govspeak references
  image_references <- image_references[, c("image_file", "image_reference")]
  return(image_references)
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
  for (i in seq_along(image_references$image_file)) {
    file_name <- image_references$image_file[i]

    # Construct markdown reference to image file
    md_image_format <- paste0("!\\[\\]\\(", images_folder, "/", file_name, "\\)<!-- -->")

    govspeak_reference <- paste0(as.character(image_references$image_reference[i]), "\n")

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

file_with_ext <- function(file, ext) {
  paste(xfun::sans_ext(file), ".", ext, sep = "")
}
