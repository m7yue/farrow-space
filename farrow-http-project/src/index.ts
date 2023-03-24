import { Http, Response } from "farrow-http";

const http = Http();

http.route('/todo').use(() => {
  return Response.text('Todo App!')
})

http.use(() => {
  return Response.text("Hello Farrow");
});

http.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});