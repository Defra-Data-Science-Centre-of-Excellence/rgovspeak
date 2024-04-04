.onLoad <- function(libname, pkgname) {
  # Load in the GOV.UK font:
  sysfonts::font_add(
    family = "GDS Transport Website",
    regular = system.file("fonts", "GDSTransportWebsite.ttf", package = pkgname),
    bold = system.file("fonts", "GDSTransportWebsite-Bold.ttf", package = pkgname)
  )

  showtext::showtext_auto()
  invisible(NULL)
}
