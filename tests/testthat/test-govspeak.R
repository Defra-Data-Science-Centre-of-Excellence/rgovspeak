test_that("application_js_dependency returns correct htmlDependency", {
  result <- application_js_dependency()

  expect_s3_class(result, "html_dependency")
  expect_equal(result$name, "application.js")
  expect_equal(result$version, "1.0")
  expect_equal(result$src$file, system.file("templates/govspeak", package = "rgovspeak2"))
  expect_equal(result$script, "application.js")
})

test_that("govspeak_dependency returns correct htmlDependency", {
  result <- govspeak_dependency()

  expect_s3_class(result, "html_dependency")
  expect_equal(result$name, "govspeak")
  expect_equal(result$version, "0.2")
  expect_equal(result$src$file, system.file("templates/govspeak", package = "rgovspeak2"))
  expect_equal(result$stylesheet, c(
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
  ))
})

test_that("pkg_file returns correct file path", {
  result <- pkg_file("templates", "govspeak")

  expect_true(file.exists(result))
  expect_equal(dirname(result), system.file("templates", package = "rgovspeak2"))
})

test_that("convert_md works correctly", {
  # Create a temporary input file
  input_file <- tempfile(fileext = ".md")
  writeLines("Test content", input_file)

  # Set up mock metadata and output file
  metadata <- list()
  output_file <- tempfile(fileext = ".html")
  clean <- TRUE
  verbose <- FALSE

  # Assign a publication date to the env_state environment
  assign("pub_date", "01/01/2022", envir = env_state)

  # Run the function
  result <- convert_md(metadata, input_file, output_file, clean, verbose)

  # Check that the function returns the correct output file
  expect_equal(result, output_file)

  # Check that the function creates the correct govspeak file
  date_str <- format(as.Date(get("pub_date", envir = env_state), format = "%d/%m/%Y"), "%d%b%Y")
  govspeak_file_name <- paste0(tools::file_path_sans_ext(basename(output_file)), "_", date_str, ".txt")
  expect_true(file.exists(file.path(dirname(output_file), govspeak_file_name)))

  # Clean up
  unlink(input_file)
  unlink(output_file)
  unlink(file.path(dirname(output_file), govspeak_file_name))
})

test_that("convert_callouts works correctly", {
  # Create a markdown string with a callout
  md_string <- "Some text\n> This is a callout\nMore text"

  # Run the function
  result <- convert_callouts(md_string)

  # Check that the function correctly converts the callout
  expect_equal(result, "Some text\n^This is a callout\nMore text")
})

test_that("convert_image_tags works correctly", {
  # Create a markdown string with an image tag
  md_string <- "\n\n\n### plot test \n\n```r\nplot(iris$Sepal.Length, iris$Sepal.Width)\n```\n\n![](rgovspeak\\test\\test1_files/figure-html/iris-figure-1_01Feb2024.svg)<!-- -->"

  # Run the function
  result <- convert_image_tags(md_string)

  # Check that the function correctly converts the image tag
  expect_equal(result, "\n\n\n### plot test \n\n```r\nplot(iris$Sepal.Length, iris$Sepal.Width)\n```\n\n[Image: iris-figure-1_01Feb2024]")
})

test_that("remove_header works correctly", {
  # Create a markdown string with a header
  md_string <- "---\ntitle: Test Title\nauthor: Test Author\n---\nSome text"

  # Run the function
  result <- remove_header(md_string)

  # Check that the function correctly removes the header
  expect_equal(result, "Some text")
})

test_that("remove_rmd_blocks works correctly", {
  # Create a markdown string with a code block
  md_string <- "Some text\n```\nThis is a code block\n```\nMore text"

  # Run the function
  result <- remove_rmd_blocks(md_string)

  # Check that the function correctly removes the code block
  expect_equal(result, "Some text\n\nMore text")
})

test_that("rename_images works correctly", {
  # Create a temporary input file
  filename <- tempfile(fileext = ".jpg")
  file.create(filename)

  # Assign a publication date to the env_state environment
  assign("pub_date", "01/01/2022", envir = env_state)

  # Run the function
  result <- rename_images(filename)

  # Check that the function returns the correct new filename
  date_str <- format(as.Date(get("pub_date", envir = env_state), format = "%d/%m/%Y"), "%d%b%Y")
  new_filename <- paste0(tools::file_path_sans_ext(basename(filename)), "_", date_str, ".", tools::file_ext(filename))
  expect_equal(basename(result), new_filename)

  # Clean up
  unlink(filename)
  unlink(new_filename)
})

test_that("move_image_files_to_extension_dirs works correctly", {
  # Create a temporary directory structure
  temp_dir <- paste0(tempfile(), "_dir")
  dir.create(temp_dir)
  files_dir <- file.path(temp_dir, "test_files")
  figure_html_dir <- file.path(files_dir, "figure-html")
  dir.create(files_dir)
  dir.create(figure_html_dir)

  # Create a temporary image file in the figure-html directory
  image_file <- file.path(figure_html_dir, "test.jpg")
  file.create(image_file)

  # Run the function and suppress any output
  capture.output(move_image_files_to_extension_dirs(temp_dir))

  # Check that the function moves the image file to the correct directory
  new_dir <- file.path(temp_dir, "images", "jpg")
  new_file <- file.path(new_dir, "test.jpg")
  expect_true(dir.exists(new_dir))
  expect_true(file.exists(new_file))

  # Clean up
  unlink(temp_dir, recursive = TRUE)
  assign("file_names", NULL, envir = env_state)
})

test_that("move_data_files_to_extension_dirs works correctly", {
  # Create a temporary directory structure
  temp_dir <- paste0(tempfile(), "_dir")
  dir.create(temp_dir)
  files_dir <- file.path(temp_dir, "test_files")
  dir.create(files_dir)

  # Create temporary data files in the files directory
  file_names <- c("test1.csv", "test2.xls", "test3.xlsx", "test4.ods")
  file_paths <- file.path(files_dir, file_names)
  file.create(file_paths)

  # Assign the file names and publication date to the env_state environment
  assign("file_names", file_paths, envir = env_state)
  assign("pub_date", "01/01/2022", envir = env_state)

  # Run the function and suppress any output
  capture.output(move_data_files_to_extension_dirs(temp_dir))

  # Check that the function moves the data files to the correct directories
  date_str <- format(as.Date(get("pub_date", envir = env_state), format = "%d/%m/%Y"), "%d%b%Y")
  new_dirs <- file.path(temp_dir, "datasets", tools::file_ext(file_names))
  new_files <- file.path(new_dirs, paste0(tools::file_path_sans_ext(file_names), "_", date_str, ".", tools::file_ext(file_names)))
  for (new_file in new_files) {
    expect_true(file.exists(new_file))
  }

  # Clean up
  unlink(temp_dir, recursive = TRUE)
  assign("file_names", NULL, envir = env_state)
})

test_that("save_data works correctly", {
    # Create a temporary directory
  temp_dir <- paste0(tempfile(), "_dir")
  dir.create(temp_dir)

  # Define a dummy save function
  save_func <- function(file) {
    write.csv(data.frame(x = 1:10, y = 11:20), file)
  }

  # Set the format variable to "html"
  assign("format", "html", envir = env_state)

  # Run the function with a file name argument
  file_name <- file.path(temp_dir, "test.csv")
  save_data(save_func, list(file_name))

  # Check that the function adds the file name to the file_names list
  expect_equal(get("file_names", envir = env_state), file_name)

  # Clean up
  unlink(temp_dir, recursive = TRUE)
  assign("file_names", NULL, envir = env_state)
})

test_that("govspeak works correctly", {
  # Run the function with a pub_date argument
  pub_date <- "1/2/2024"
  output_format <- govspeak(pub_date = pub_date)

  # Check that the function assigns the pub_date and format variables
  expect_equal(get("pub_date", envir = env_state), pub_date)
  expect_equal(get("format", envir = env_state), "html")

  # Check that the function returns an output_format object
  expect_s3_class(output_format, "rmarkdown_output_format")

  # Clean up
  rm("pub_date", "format", envir = env_state)
})