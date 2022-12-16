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
  output <- "output"                      # Dir where all outputs are stored
  fig_path = paste0(output, "/images/")   # Dir where images are stored
  data_path = paste0(output, "/datasets") # Dir where datasets are stored

  fs::dir_create(output)
  fs::dir_create(fig_path)
  fs::dir_create(data_path)

  html_template(
      template_name = "govespeak_html",
      template_path = "templates/template.html",
      template_dependencies = list(html_dependency_govspeak()),
      fig_width = 960 / 72,
      fig_height = 640 / 72,
      dpi = 72,
      output = output,
      fig_path = fig_path,
      data_path = data_path,
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
convert_md <- function(path, images_folder = "output/images", remove_blocks=TRUE) {
  govspeak_file <- paste(readLines(path), collapse = "\n")

  img_files <- fs::dir_ls(images_folder)

   if (length(img_files) > 0) {
     # find all the ones that end -1.png and rename by removing the -1
     #correct_names <- stringr::str_replace_all(img_files, '-1.png', '.png')
     # fs::file_move(img_files, stringr::str_replace_all(correct_names, '-1.png', '.png'))
     filtered_names <- unique(img_files[stringr::str_detect(img_files, '-1.png$')])

     image_references <- tibble::tibble(image = sort(filtered_names),
                                        id = paste0('!!', 1:length(filtered_names)))


     govspeak_file <- convert_image_references(image_references, govspeak_file, images_folder)

     # All the images are linked to the correct !! number so re name the files and save the list
     correct_names <- stringr::str_replace_all(filtered_names, '-1.png', '.png')
     fs::file_move(filtered_names, stringr::str_replace_all(correct_names, '-1.png', '.png'))

     write.csv(tibble::tibble(image = sort(basename(correct_names)),
                              id = paste0('!!', 1:length(correct_names))),
               paste0("output", "/", 'images.csv'), row.names = FALSE)
   }

   govspeak_file <- remove_header(govspeak_file)

   govspeak_file <- convert_callouts(govspeak_file)

   if (remove_blocks) {
     govspeak_file <- remove_rmd_blocks(govspeak_file)
   }

   file_name <- gsub("\\.knit.md", "_govspeak\\.txt", path)
   write(govspeak_file, fs::path("output", file_name))
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

    # Construct markdown reference to image file
    # ![](images/1-abc-1.png)<!-- -->!
    md_image_format <- paste0("!\\[\\]\\(", stringr::str_remove(as.character(file_name), '\\./'), "\\)<!-- -->")

    govspeak_reference <- paste0(as.character(image_references$id[i]), "\n")

    # Replace markdown image reference with govspeak reference
    govspeak_image_reference_file <- gsub(md_image_format, govspeak_reference, govspeak_image_reference_file)
  }

  # delete any remaining image tags
  govspeak_image_reference_file <- gsub("!\\[\\]\\(.*\\)<!-- -->", "", govspeak_image_reference_file)
  return(govspeak_image_reference_file)
}


#' Convert markdown callout syntax to govspeak
#' @param md_file string; markdown file text
#' @name convert_callouts
#' @title Convert markdown callout syntax to govspeak
convert_callouts <- function(md_file) {
  # Lazy match on lines starting with ">", which are then flanked with "^"
  # Currently only catches single line callouts
  gsub("(\\n)>[ ]*(.*?\\n)", "\\1^\\2", md_file)
}


#' Replace R markdown header with title only
#' @param md_file string; markdown file text
#' @name remove_header
#' @title Replace R markdown header with ## title
remove_header <- function(md_file) {
  # Lazy match on header to extract title
  # Remove substitution if titles must be entered manually
  gsub("---\\n.*?---\\n", "", md_file)
}


#' Remove R markdown multiline block elements (package warnings, but also multiline code blocks)
#' @param md_file string; markdown file text
#' @name remove_rmd_blocks
#' @title Remove R markdown multiline block elements (package warning and code block)
remove_rmd_blocks <- function(md_file) {
  # Lazy match on warnings and code blocks
  gsub("```.*?```", "", md_file)
}
