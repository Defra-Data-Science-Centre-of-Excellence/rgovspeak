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
application_js_dependency <- function() {
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
    version = "0.2",
    src = system.file("templates/govspeak", package = "rgovspeak2"),
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
  system.file(..., package = "rgovspeak2", mustWork = TRUE)
}

check_for_figure_html_dir <- function(path) {
  # Check if a folder that ends with '_files' exists in the provided path
  files_dir <- dir(path, pattern = "_files$", full.names = TRUE)

  # Check if a 'figure_html' folder exists inside the '_files' folder
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
    ext <- tools::file_ext(file)

    # Construct the new file name by appending the date_str to the end of the file name
    new_filename_with_date <- paste0(tools::file_path_sans_ext(new_filename), "_", date_str, ".", ext)

    # Move the file to the new filename
    fs::file_move(path = fs::path(image_dir, file), new_path = fs::path(image_dir, new_filename_with_date))

    # Add the original and new filenames to the data frame
    filenames_df <- rbind(filenames_df, data.frame(Original = file, New = new_filename_with_date, stringsAsFactors = FALSE))
  }

  # Return the data frame
  filenames_df
}

rename_data_files <- function(input_dir, date_str) {
  files <- get("file_names", envir = env_state)

  # Create a vector to store the new filenames
  new_filenames <- c()

  # Loop over each file
  for (file in files) {
    # Remove the "-number" suffix from the filename
    new_filename <- stringr::str_remove(string = file, pattern = "-\\d+(?=\\.)")

    # Get the file extension
    ext <- tools::file_ext(file)

    # Construct the new file name by appending the date_str to the end of the file name
    new_filename_with_date <- paste0(tools::file_path_sans_ext(new_filename), "_", date_str, ".", ext)

    # Move the file to the new filename
    fs::file_move(path = fs::path(input_dir, file), new_path = fs::path(input_dir, new_filename_with_date))

    # Add the new filename to the vector
    new_filenames <- c(new_filenames, new_filename_with_date)
  }

  new_filenames
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
    print(paste0("moving ", basename(file)))
    # Get the file extension
    ext <- tools::file_ext(file)

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

move_data_files_to_extension_dirs <- function(file_names, output_dir) {
  # If no files were saved using save_data() then return
  if (length(file_names) == 0) {
    return()
  }

  # Define the file extensions that should create sub folders
  extensions <- c("xls", "xlsx", "csv", "ods")

  # Create subfolders for each extension and move matching files
  datasets_folder <- fs::path(output_dir, "datasets")
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

          # Move the file to the new directory
          file.rename(file, fs::path(extension_folder, file))

          moved_files <- c(moved_files, file) # Add moved file to the list
        }
      }
    }
  }

  # check if all the files were moved, if not move the rest into output_dir
  if (length(moved_files) < length(file_names)) {
    for (file in file_names) {
      if (!file %in% moved_files) {
        print(paste0("moving ", file))
        file.rename(file, fs::path(output_dir, file))
      }
    }
  }
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

post_processor <- function(metadata, input_file, output_file, clean, verbose, ...) {
  # sort the publishing date out
  if (!is.null(metadata$publish_date)) {
    date_str <- format(as.Date(metadata$publish_date), "%d%b%Y")
  } else {
    date_str <- format(Sys.Date(), "%d%b%Y")
  }

  output_dir <- dirname(output_file)

  # Handle any image files
  renamed_images <- NULL

  if (check_for_figure_html_dir(output_dir)) {
    image_dir <- file.path(output_dir, sub(".knit.md", "_files", input_file), "figure-html")
    renamed_images <- rename_images(image_dir, date_str)
    move_image_files_to_extension_dirs(image_dir)
  }

  # Handle any data files
  renames <- rename_data_files(fs::path(output_dir, "../"), date_str)
  move_data_files_to_extension_dirs(renames, output_dir)

  # Handle the markdown file
  govspeak_file <- convert_md(input_file, output_file, renamed_images)

  # Write the govspeak_file to "govspeak.txt" in the same directory as the output_file
  # Convert the pub_date to "dd%b%Y" format
  govspeak_file_name <- paste0(tools::file_path_sans_ext(basename(output_file)), "_", date_str, ".txt")
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
convert_md <- function(input_file, output_file, renamed_images) {
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
    ...) {
  assign("format", "html", envir = env_state)
  # print(mget(ls(envir = env_state), envir = env_state))
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
    keep_md = FALSE,
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
