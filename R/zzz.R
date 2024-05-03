.onLoad <- function(libname, pkgname) {
  # Load in the GOV.UK font:
  sysfonts::font_add(
    family = "GDS Transport Website",
    regular = system.file("fonts", "GDSTransportWebsite.ttf", package = pkgname),
    bold = system.file("fonts", "GDSTransportWebsite-Bold.ttf", package = pkgname)
  )

  showtext::showtext_auto()
  invisible(NULL)

  # Define state environment
  env_state <- rlang::new_environment(parent = rlang::empty_env())
  
  # Assign env_state to the package environment
  assign("env_state", env_state, envir = parent.env(environment()))
  
  # Initialise variables
  assign("file_names", c(), envir = env_state)
}

