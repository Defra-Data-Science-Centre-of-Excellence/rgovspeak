% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/govspeak.R
\name{post_processor}
\alias{post_processor}
\title{Post-process output after rendering}
\usage{
post_processor(metadata, input_file, output_file, clean, verbose, ...)

post_processor(metadata, input_file, output_file, clean, verbose, ...)
}
\arguments{
\item{metadata}{List of document metadata.}

\item{input_file}{Path to the input file.}

\item{output_file}{Path to the output file.}

\item{clean}{Logical; whether to clean up after rendering.}

\item{verbose}{Logical; whether to print verbose output.}

\item{...}{Additional arguments.}
}
\value{
The output file path.

The output file path (character).
}
\description{
This function is called after rendering to handle post-processing tasks such as
renaming images, moving image and data files to appropriate directories, and
generating a govspeak text file. It also ensures the output file is returned for
further processing.
}
\keyword{internal}
