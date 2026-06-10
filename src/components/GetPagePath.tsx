export function getPagePath(name: string): string {
  switch (name) {
    case "dashboard":
      return "/";
    case "about":
      return "/about";
    default:
      return "/";
  }
}
