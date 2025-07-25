test_that("set_publication_date and get_publication_date work as expected", {
  set_publication_date(as.Date("2024-01-01"))
  expect_equal(get_publication_date(), as.Date("2024-01-01"))
})

test_that("check_for_figure_html_dir detects figure-html directory", {
  tmp <- tempfile()
  dir.create(tmp)
  files_dir <- file.path(tmp, "test_files")
  dir.create(files_dir)
  fig_dir <- file.path(files_dir, "figure-html")
  dir.create(fig_dir)
  # Should detect figure-html
  expect_true(check_for_figure_html_dir(tmp))
  unlink(tmp, recursive = TRUE)
})

test_that("rename_images renames files and returns correct mapping", {
  tmp <- tempfile()
  dir.create(tmp)
  file.create(file.path(tmp, "img-1.png"))
  file.create(file.path(tmp, "img-2.png"))
  df <- rename_images(tmp, "20250101")
  expect_true(all(grepl("20250101", df$New)))
  expect_true(all(file.exists(file.path(tmp, df$New))))
  unlink(tmp, recursive = TRUE)
})

test_that("move_image_files_to_extension_dirs moves files to correct subfolders", {
  tmp <- tempfile()
  dir.create(tmp)
  file.create(file.path(tmp, "img1.png"))
  file.create(file.path(tmp, "img2.jpg"))
  move_image_files_to_extension_dirs(tmp)
  img_dir <- normalizePath(file.path(tmp, "..", "..", "images"), mustWork = FALSE)
  expect_true(file.exists(file.path(img_dir, "png", "img1.png")))
  expect_true(file.exists(file.path(img_dir, "jpg", "img2.jpg")))
  unlink(img_dir, recursive = TRUE)
})

test_that("move_data_files_to_extension_dirs moves and renames files", {
  tmp <- tempfile()
  dir.create(tmp)
  file1 <- file.path(tmp, "test-1.csv")
  file2 <- file.path(tmp, "test-2.txt")
  file.create(file1)
  file.create(file2)
  files <- c(file1, file2)
  move_data_files_to_extension_dirs(files, tmp, "20250101")
  expect_true(file.exists(file.path(tmp, "data", "csv", "test_20250101.csv")))
  expect_true(file.exists(file.path(tmp, "data", "test_20250101.txt")))
  unlink(tmp, recursive = TRUE)
})

test_that("clean_up resets env_state variables", {
  assign("file_names", c("foo.csv"), envir = env_state)
  assign("format", "html", envir = env_state)
  clean_up("dummy")
  expect_equal(get("file_names", envir = env_state), c())
  expect_null(get("format", envir = env_state))
})
test_that("application_js_dependency returns correct htmlDependency", {
  result <- application_js_dependency()

  expect_s3_class(result, "html_dependency")
  expect_equal(result$name, "application.js")
  expect_equal(result$version, "1.0")
  expect_equal(result$src$file, system.file("templates/govspeak", package = "rgovspeak"))
  expect_equal(result$script, "application.js")
})

test_that("govspeak_dependency returns correct htmlDependency", {
  result <- govspeak_dependency()

  expect_s3_class(result, "html_dependency")
  expect_equal(result$name, "rgovspeak")
  expect_equal(result$version, "1.1.0")
  expect_equal(result$src$file, system.file("templates/govspeak", package = "rgovspeak"))
  expect_equal(
    result$stylesheet,
    c(
      "assets/static/application.css",
      "assets/government-frontend/application.css",
      "assets/government-frontend/views/_html-publication.css",
      "assets/government-frontend/govuk_publishing_components/components/_organisation-logo.css",
      "assets/government-frontend/govuk_publishing_components/components/_attachment.css",
      "assets/government-frontend/govuk_publishing_components/components/_attachment-link.css",
      "assets/government-frontend/govuk_publishing_components/components/_contextual-sidebar.css",
      "assets/government-frontend/govuk_publishing_components/components/_details.css",
      "assets/government-frontend/govuk_publishing_components/components/_govspeak.css",
      "assets/government-frontend/govuk_publishing_components/components/_lead-paragraph.css",
      "assets/government-frontend/govuk_publishing_components/components/_metadata.css",
      "assets/government-frontend/govuk_publishing_components/components/_print-link.css",
      "assets/government-frontend/govuk_publishing_components/components/_published-dates.css",
      "assets/government-frontend/govuk_publishing_components/components/_related-navigation.css",
      "assets/government-frontend/govuk_publishing_components/components/_single-page-notification-button.css",
      "assets/government-frontend/govuk_publishing_components/components/_inverse-header.css",
      "assets/government-frontend/govuk_publishing_components/components/_contents-list.css"
    )
  )
})

test_that("pkg_file returns correct file path", {
  result <- pkg_file("templates", "govspeak")

  expect_true(file.exists(result))
  expect_equal(dirname(result), system.file("templates", package = "rgovspeak"))
})

test_that("convert_md correctly converts markdown file", {
  # Create a temporary input file
  input_file <- tempfile(fileext = ".md")
  writeLines(
    c("---\n Title: Test ---\n", "![](C:\\a\\b\\c/image.png)<!-- -->", "```{r}", "print('Hello, world!')", "```"),
    input_file
  )

  # Create a renamed_images data frame
  renamed_images <- data.frame(Original = "image.png", New = "image_01Jan2022.png", stringsAsFactors = FALSE)

  # Call convert_md
  output <- convert_md(input_file, renamed_images)

  # Check that the header is removed
  expect_false(grepl("Title: Test", output))

  # Check that the image tag is converted
  expect_true(grepl("[Image: image_01Jan2022.png]", output))

  # Check that the R Markdown block is removed
  expect_false(grepl("```\\{r\\}", output))
  expect_false(grepl("print('Hello, world!')", output))
  expect_false(grepl("```", output))

  # Clean up
  file.remove(input_file)
})

test_that("convert_callouts works correctly", {
  # Create a markdown string with a callout
  md_string <- "Some text\n> This is a callout\nMore text"

  # Run the function
  result <- convert_callouts(md_string)

  # Check that the function correctly converts the callout
  expect_equal(result, "Some text\n^This is a callout\nMore text")
})

test_that("convert_image_tags correctly converts image tags", {
  # Create an input string
  input_string <- "![](C:\\a\\b\\c/image.png)<!-- -->"

  # Create a renamed_images data frame
  renamed_images <- data.frame(Original = "image.png", New = "image_01Jan2022.png", stringsAsFactors = FALSE)

  # Call convert_image_tags
  output <- convert_image_tags(input_string, renamed_images)

  # Check that the image tag is converted
  expect_equal(output, "[Image: image_01Jan2022.png]")
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
  expect_equal(get("format", envir = env_state), "html")

  # Check that the function returns an output_format object
  expect_s3_class(output_format, "rmarkdown_output_format")

  # Clean up
  rm("format", envir = env_state)
})
