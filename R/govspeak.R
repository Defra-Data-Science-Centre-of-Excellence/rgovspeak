#' @export
set_publication_date <- function(date) {
  assign("publication_date", date, envir = env_state)
}

#' @export
get_publication_date <- function() {
  get("publication_date", envir = env_state)
}

#' Function to add application.js as a dependency
#'
#' This function adds application.js as a dependency in an HTML document.
#' @return A HTML dependency object for application.js
application_js_dependency <- function() {
  htmltools::htmlDependency(
    name = "application.js",
    version = "1.0",
    src = system.file("templates/govspeak", package = "rgovspeak"),
    script = "application.js"
  )
}

#' Function to create a HTML dependency for Govspeak templates
#'
#' This function creates a HTML dependency for Govspeak templates, which includes the name, version,
#' source, and stylesheet.
#' @return A HTML dependency object for Govspeak templates
govspeak_dependency <- function() {
  htmltools::htmlDependency(
    name = "govspeak",
    version = "0.2",
    src = system.file("templates/govspeak", package = "rgovspeak"),
    stylesheet = c(
      "application.css",
      "application2.css",
      "html_publication.css",
      "organisation_logo.css",
      "inverse_header.css",
      "contents_list.css",
      "toc.css",
      "print_link.css",
      "govspeak_html_publication.css",
      "govspeak.css",
      "back_to_top.css"
    )
  )
}

# locations of resource files in the package
#' Function to get the file path of a resource file in the package
#'
#' @param ... additional path components to the resource file
#' @return the file path of the resource file
pkg_file <- function(...) {
  system.file(..., package = "rgovspeak", mustWork = TRUE)
}

check_for_figure_html_dir <- function(path) {
  # Get the suffix for auxiliary files from global options, default to '_files'
  files_suffix <- getOption("rmarkdown.files.suffix", "_files")

  # Check if a folder that ends with the specified suffix exists in the provided path
  files_dir <- dir(path, pattern = paste0(files_suffix, "$"), full.names = TRUE)

  # Check if a 'figure_html' folder exists inside the auxiliary files folder
  figure_html_dir <- list.dirs(files_dir, full.names = FALSE, recursive = FALSE)

  # Check if 'figure_html' directory is found
  if ("figure-html" %in% figure_html_dir) {
    TRUE
  } else {
    FALSE
  }
}

rename_images <- function(image_dir, date_str) {
  files <- list.files(image_dir)

  # Create a data frame to store the original and new filenames
  filenames_df <- data.frame(Original = character(), New = character(), stringsAsFactors = FALSE)

  # Loop over each file
  for (file in files) {
    # Remove the "-number" suffix from the filename
    new_filename <- stringr::str_remove(string = file, pattern = "-\\d+(?=\\.)")

    # Get the file extension
    ext <- fs::path_ext(file)

    # Construct the new file name by appending the date_str to the end of the file name
    new_filename_with_date <- paste0(fs::path_ext_remove(new_filename), "_", date_str, ".", ext)

    # Move the file to the new filename
    fs::file_move(path = fs::path(image_dir, file), new_path = fs::path(image_dir, new_filename_with_date))

    # Add the original and new filenames to the data frame
    filenames_df <- rbind(
      filenames_df,
      data.frame(Original = file, New = new_filename_with_date, stringsAsFactors = FALSE)
    )
  }

  # Return the data frame
  filenames_df
}

move_image_files_to_extension_dirs <- function(image_dir) {
  # if there is already an images folder delete it, then rename and move
  if (dir.exists(file.path("../../images"))) {
    fs::dir_delete(file.path("../../images"))
  }

  new_image_dir <- file.path(image_dir, "../../images")
  fs::dir_create(new_image_dir)

  files <- list.files(image_dir, full.names = TRUE)

  # Loop over each file
  for (file in files) {
    # Get the file extension
    ext <- fs::path_ext(file)

    # Create a new directory for this extension if it doesn't exist
    new_dir <- file.path(new_image_dir, ext)
    if (!dir.exists(new_dir)) {
      dir.create(new_dir)
    }

    # Move the file to the new directory
    file.rename(file, file.path(new_dir, basename(file)))
  }

  # Check if files_dir is empty
  if (length(list.files(file.path(image_dir))) == 0) {
    # If it is, delete it
    fs::dir_delete(file.path(image_dir))
  }
}

move_data_files_to_extension_dirs <- function(file_names, output_dir, date_str) {
  # If no files were saved using save_data() then return
  if (length(file_names) == 0) {
    return()
  }

  # Define the file extensions that should create sub folders
  extensions <- c("xls", "xlsx", "csv", "ods")

  # Create the data folder if it doesn't exist
  data_folder <- fs::path(output_dir, "data")
  if (!fs::dir_exists(data_folder)) {
    fs::dir_create(data_folder)
  }

  # Move all files to the data folder
  moved_files <- vector("character", length = 0) # List to store moved files
  for (file in file_names) {
    if (fs::file_exists(file)) {
      # Move the file to the data folder
      fs::file_move(file, fs::path(data_folder, fs::path_file(file)))

      moved_files <- c(moved_files, fs::path(data_folder, fs::path_file(file))) # Add moved file to the list
    }
  }

  # Rename the files and move them to subfolders based on their extensions
  for (file in moved_files) {
    # Remove the "-number" suffix from the filename
    new_filename <- stringr::str_remove(string = fs::path_file(file), pattern = "-\\d+(?=\\.)")

    # Get the file extension
    ext <- fs::path_ext(file)

    # Construct the new file name by appending the date_str to the end of the file name
    new_filename_with_date <- paste0(fs::path_ext_remove(new_filename), "_", date_str, ".", ext)

    # If the file extension is in the extensions vector, move it to a subfolder
    if (ext %in% extensions) {
      # Create a new directory for this extension if it doesn't exist
      extension_folder <- fs::path(data_folder, ext)
      if (!fs::dir_exists(extension_folder)) {
        fs::dir_create(extension_folder)
      }

      # Move the file to the new directory and rename it
      fs::file_move(file, fs::path(extension_folder, new_filename_with_date))
    } else {
      # If the file extension is not in the extensions vector, just rename it
      fs::file_move(file, fs::path(data_folder, new_filename_with_date))
    }
  }
}

#' @export
save_data <- function(save_func, args_list) {
  # Detect the file name from args_list
  file_name <- NULL
  for (arg in args_list) {
    if (is.character(arg) && length(arg) == 1 && grepl("\\.\\w+$", arg)) {
      file_name <- arg
      break
    }
  }

  output_format <- knitr::opts_knit$get("rmarkdown.pandoc.to")

  if (!is.null(file_name) && (is.null(output_format) || output_format == "html")) {
    # Add the file name to the global list
    env_state$file_names <- c(env_state$file_names, file_name)
  }

  do.call(save_func, args_list)
}

post_processor <- function(metadata, input_file, output_file, clean, verbose, ...) {
  # Sort out the publication date
  if (exists("publication_date", envir = env_state)) {
    date_str <- format(get("publication_date", envir = env_state), "%d%b%Y")
  } else if (!is.null(metadata$publish_date)) {
    date_str <- format(as.Date(metadata$publish_date), "%d%b%Y")
  } else {
    date_str <- format(Sys.Date(), "%d%b%Y")
  }

  output_dir <- dirname(output_file)

  # Handle any image files
  renamed_images <- NULL

  if (check_for_figure_html_dir(output_dir)) {
    image_dir <- file.path(
      output_dir,
      sub(".knit.md", getOption("rmarkdown.files.suffix", "_files"), input_file), 
      "figure-html"
    )
    renamed_images <- rename_images(image_dir, date_str)
    move_image_files_to_extension_dirs(image_dir)
  }

  # Handle any data files
  move_data_files_to_extension_dirs(env_state$file_names, output_dir, date_str)

  env_state$file_names <- NULL

  # Handle the markdown file
  govspeak_file <- convert_md(input_file, renamed_images)

  # Write the govspeak_file to "govspeak.txt" in the same directory as the output_file
  govspeak_file_name <- paste0(fs::path_ext_remove(basename(output_file)), "_", date_str, ".txt")
  writeLines(govspeak_file, file.path(dirname(output_file), govspeak_file_name))

  output_file
}

#' Convert Markdown to a rendered file
#'
#' This function converts a Markdown file to a govspeak file using the specified metadata.
#'
#' @param metadata The metadata for the conversion process.
#' @param input_file The path to the input Markdown file.
#' @param output_file The path to save the rendered file.
#' @param clean A logical value indicating whether to clean the output directory before rendering.
#' @param verbose A logical value indicating whether to display verbose output during the conversion process.
#'
#' @return The path to the rendered file.
convert_md <- function(input_file, renamed_images) {
  govspeak_file <- paste(readLines(input_file), collapse = "\n")

  govspeak_file <- govspeak_file |>
    remove_header() |>
    convert_callouts() |>
    remove_rmd_blocks()

  if (!is.null(renamed_images)) {
    govspeak_file <- convert_image_tags(govspeak_file, renamed_images)
  }

  govspeak_file
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

convert_image_tags <- function(input_string, renamed_images) {
  # Loop over each row in renamed_images
  for (i in seq_len(nrow(renamed_images))) {
    # Get the original and new filenames
    original <- renamed_images$Original[i]
    new <- renamed_images$New[i]

    # Create the pattern and replacement strings
    # The pattern now matches any characters (non-greedy) before and including the original filename
    pattern <- paste0("!\\[\\]\\([^)]*", original, "\\)<!-- -->")
    replacement <- paste0("[Image: ", new, "]")

    # Use gsub to find and replace all occurrences of the original filename
    input_string <- gsub(
      pattern = pattern,
      replacement = replacement,
      x = input_string,
      perl = TRUE
    )
  }

  # Return the modified string
  input_string
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

clean_up <- function(input_file) {
  assign("file_names", c(), envir = env_state)
  assign("format", NULL, envir = env_state)
}

# This function converts GovSpeak markup language to HTML.
#' @export
govspeak <- function(
    image_type = "svg",
    fig_width = 960 / 72,
    fig_height = 640 / 72,
    dpi = 72,
    pandoc_args = NULL,
    keep_md = FALSE,
    ...) {
  # dependencies
  extra_dependencies <- list(
    govspeak_dependency(),
    application_js_dependency(),
    rmarkdown::html_dependency_jquery(),
    rmarkdown::html_dependency_jqueryui(),
    rmarkdown::html_dependency_tocify()
  )

  # template path
  template_file <- pkg_file("templates/template.html")
  govuk_lua <- pkg_file("templates/govspeak/govuk.lua")
  chart_filter <- pkg_file("templates/govspeak/chart_filter.lua")
  pandoc_args <- c(
    pandoc_args,
    "--toc",
    "--template",
    template_file,
    "--lua-filter",
    govuk_lua,
    "--lua-filter",
    chart_filter,
    "--variable",
    paste0("date:", Sys.time())
  )

  # knitr options
  knitr_options <- rmarkdown::knitr_options_html(fig_width, fig_height, NULL, TRUE, dev = image_type)

  rmarkdown::output_format(
    knitr = knitr_options,
    pandoc = rmarkdown::pandoc_options(to = "html", args = pandoc_args),
    keep_md = keep_md,
    on_exit = clean_up,
    post_processor = post_processor,
    base_format = rmarkdown::html_document_base(
      template_name = "govspeak",
      template_dependencies = list(govspeak_dependency()),
      extra_dependencies = extra_dependencies,
      toc = TRUE,
      toc_level = 3,
      ...
    )
  )
}
