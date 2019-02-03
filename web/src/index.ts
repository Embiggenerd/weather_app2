import app from "./App";

console.log("web index invoked")
class Server {
  public port: string;

  constructor() {
    this.port = process.env.PORT || "3002";
    this.listen()
  }

  private listen(): void {
    
    app.listen(this.port, () => {
      console.log(`webz listening on port ${this.port}`)
    })
  }
}

export default new Server()