import { Http, usePrefix, Response } from "farrow-http";

const http = Http({
  basenames: ["/base0"],
});

http.route("/base1").use(() => {
  // prefix will be '/base0/base1' if user accessed /base0/base1
  let prefix = usePrefix();
  /**
   * basenames route middleware 中修改
   * Context.use 返回 get value (container.read), set value (container.write)
   */
  return Response.json({ prefix });
});


http.listen(3000);