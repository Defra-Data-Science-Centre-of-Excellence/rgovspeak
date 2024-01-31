# Initialization -----------------------------------------------------------

# Define package environment
env_state <- rlang::new_environment(parent = rlang::empty_env())

# Initialize file_names variable
assign("file_names", c(), envir = env_state)

# Function Definitions -----------------------------------------------------

#' Function to add application.js as a dependency
#'
#' This function adds application.js as a dependency in an HTML document.
#' @return A HTML dependency object for application.js
application_js_dependency <- function(path) {
  htmltools::htmlDependency(
    name = "application.js",
    version = "1.0",
    src = system.file("templates/govspeak", package = "rgovspeak2"),
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
    version = "0.1",
    src = system.file("templates/govspeak", package = "rgovspeak2"),
    stylesheet = c("application.css", "application2.css", "toc.css")
  )
}

# locations of resource files in the package
#' Function to get the file path of a resource file in the package
#'
#' @param ... additional path components to the resource file
#' @return the file path of the resource file
pkg_file <- function(...) {
  system.file(..., package = "rgovspeak2", mustWork = TRUE)
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
convert_md <- function(metadata, input_file, output_file, clean, verbose) {
  # output_file is the path to the rendered file. This is the only place we have access to that info.
  # save it for later use
  assign("file_path", dirname(output_file), envir = .GlobalEnv)

  govspeak_file <- paste(readLines(input_file), collapse = "\n")

  govspeak_file <- govspeak_file |>
    remove_header() |>
    convert_callouts() |>
    convert_image_tags() |>
    remove_rmd_blocks()

  # Write the govspeak_file to "govspeak.txt" in the same directory as the output_file
  govspeak_file_name <- paste0(tools::file_path_sans_ext(basename(output_file)), "_govspeak.txt")
  writeLines(govspeak_file, file.path(dirname(output_file), govspeak_file_name))

  # we don't modify the html so just return it
  output_file
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

convert_image_tags <- function(input_string) {
  # Use gsub to find and replace all occurrences of markdown image tags
  gsub(
    pattern = "!\\[\\]\\([^)]*\\/([^\\/]*?)\\.png\\)<!-- -->",
    replacement = "[Image: \\1]",
    x = input_string,
    perl = TRUE
  )
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


# This function renames images by removing the "-number" suffix from the filename.
# It then moves the file to the new filename and returns the new filename if the file exists.
rename_images <- function(filename) {
  print("rename_images called")
  # Convert the pub_date to "dd%b%Y" format
  date_str <- format(as.Date(get("pub_date", envir = env_state), format = "%d/%m/%Y"), "%d%b%Y")

  # Remove the "-number" suffix from the filename
  new_filename <- stringr::str_remove(string = filename, pattern = "-\\d+(?=\\.)")

  # Get the file extension
  ext <- tools::file_ext(filename)

  # Construct the new file name by appending the date_str to the end of the file name
  new_filename_with_date <- paste0(tools::file_path_sans_ext(new_filename), "_", date_str, ".", ext)
  print(new_filename_with_date)
  # Move the file to the new filename
  fs::file_move(path = filename, new_path = new_filename_with_date)

  # Return the new filename if the file exists, otherwise return the original filename
  ifelse(fs::file_exists(new_filename_with_date), new_filename_with_date, filename)
}

move_image_files_to_extension_dirs <- function(file_path) {
  # Check if a folder that ends with '_files' exists in file_path
  dirs <- list.dirs(file_path, full.names = FALSE)
  files_dir <- dirs[grepl("_files$", dirs)]

  if (length(files_dir) == 0) {
    return()
  }

  # Check if a 'figure_html' folder exists inside the '_files' folder
  figure_html_dir <- list.dirs(file.path(file_path, files_dir), full.names = FALSE)

  if (!"figure-html" %in% figure_html_dir) {
    return()
  }

  # if there is already an images folder delete it, then rename and move
  if (dir.exists(file.path(file_path, files_dir, "../images"))) {
    fs::dir_delete(file.path(file_path, files_dir, "../images"))
  }

  fs::file_move(file.path(file_path, files_dir, "figure-html"), file.path(file_path, files_dir, "../images"))
  images_path <- file.path(file_path, "images")
  files <- list.files(images_path, full.names = TRUE)

  # Loop over each file
  for (file in files) {
    print(paste0("moving ", file))
    # Get the file extension
    ext <- tools::file_ext(file)

    # Create a new directory for this extension if it doesn't exist
    new_dir <- file.path(images_path, ext)
    if (!dir.exists(new_dir)) {
      dir.create(new_dir)
    }

    # Move the file to the new directory
    file.rename(file, file.path(new_dir, basename(file)))
  }

  # Check if files_dir is empty
  if (length(list.files(file.path(file_path, files_dir))) == 0) {
    # If it is, delete it
    fs::dir_delete(file.path(file_path, files_dir))
  }
}

move_data_files_to_extension_dirs <- function(file_path) {
  date_str <- format(as.Date(get("pub_date", envir = env_state), format = "%d/%m/%Y"), "%d%b%Y")
  file_names <- get("file_names", envir = env_state)

  # If no files were saved using save_data() then return
  if (length(file_names) == 0) {
    return()
  }

  # Define the file extensions that should sub folders
  extensions <- c("xls", "xlsx", "csv", "ods")

  # Create subfolders for each extension and move matching files
  datasets_folder <- fs::path(file_path, "datasets")
  moved_files <- vector("character", length = 0) # List to store moved files

  for (extension in extensions) {
    extension_files <- file_names[tools::file_ext(file_names) == extension]

    if (length(extension_files) > 0) {
      # Check if the datasets folder exists, if not create it
      if (!fs::dir_exists(datasets_folder)) {
        fs::dir_create(datasets_folder)
      }

      # Create a new directory for this extension if it doesn't exist
      extension_folder <- fs::path(datasets_folder, extension)
      if (!fs::dir_exists(extension_folder)) {
        fs::dir_create(extension_folder)
      }

      # Move the files to the new directory if they exist
      for (file in extension_files) {
        if (fs::file_exists(file)) {
          print(paste0("moving ", file))
          ext <- tools::file_ext(file)

          # Construct the new file name by appending the date_str to the end of the file name
          file_name <- paste0(tools::file_path_sans_ext(file), "_", date_str, ".", ext)

          # Move the file to the new directory
          file.rename(file, file.path(extension_folder, basename(file_name)))

          moved_files <- c(moved_files, file) # Add moved file to the list
        }
      }
    }
  }

  # Check if the files exist before deleting
  for (file in moved_files) {
    if (fs::file_exists(file)) {
      fs::file_delete(file)
    }
  }
}

clean_up <- function() {
  on.exit(print("Cleaning up"), add = TRUE)
  if (exists("file_path")) {
    on.exit(move_image_files_to_extension_dirs(file_path), add = TRUE)
    on.exit(move_data_files_to_extension_dirs(file_path), add = TRUE)
  }
  assign("format", NULL, envir = env_state)
}

# Use the output_format variable in the save_data function
#' @export
save_data <- function(save_func, args_list) {
  if (!is.null(get("format", envir = env_state)) && get("format", envir = env_state) == "html") {
    # Detect the file name from args_list
    file_name <- NULL
    for (arg in args_list) {
      if (is.character(arg) && length(arg) == 1 && grepl("\\.\\w+$", arg)) {
        file_name <- arg
        break
      }
    }

    if (!is.null(file_name)) {
      # Add the file name to the global list
      assign("file_names", c(get("file_names", envir = env_state), file_name), envir = env_state)
    }
    do.call(save_func, args_list)
  }
}


# This function converts GovSpeak markup language to HTML.
#' @export
govspeak <- function(
    image_type = "svg",
    fig_width = 960 / 72,
    fig_height = 640 / 72,
    dpi = 72,
    pandoc_args = NULL,
    pub_date = NULL,
    ...) {
  # Check that the pub_date argument has been provided
  if (is.null(pub_date)) {
    stop(
      paste0(
        "The 'pub_date' argument has not been provided. Please provide it in the YAML header like this:\n\n",
        "output:\n  rgovspeak2::govspeak:\n    pub_date: \"1/2/2024\""
      )
    )
  }

  assign("pub_date", pub_date, envir = env_state)
  assign("format", "html", envir = env_state)
  
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
  pandoc_args <- c(pandoc_args, "--template", template_file, "--lua-filter", govuk_lua, "--lua-filter", chart_filter)

  # knitr options
  knitr_options <- rmarkdown::knitr_options_html(fig_width, fig_height, NULL, TRUE, dev = image_type)
  knitr_options$opts_chunk <- append(knitr_options$opts_chunk, knitr::opts_chunk$set(fig.process = rename_images))

  rmarkdown::output_format(
    knitr = knitr_options,
    pandoc = rmarkdown::pandoc_options(to = "html", args = pandoc_args),
    keep_md = TRUE,
    on_exit = clean_up,
    post_processor = convert_md,
    base_format = rmarkdown::html_document_base(
      template_name = "govspeak",
      template = pkg_file("templates/template.html"),
      template_dependencies = list(govspeak_dependency()),
      extra_dependencies = extra_dependencies,
      pandoc_args = pandoc_args,
      ...
    )
  )
}
