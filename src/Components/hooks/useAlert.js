export default function (state, action) {
  switch (action.type) {
    case "success":
      return "Successfully done!";
    case "failure":
      return "Something Went wrong!";
    default:
      return "";
  }
}
