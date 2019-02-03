import app from "./App";

console.log("users index invoked")
class Server {
  public port: string;

  constructor() {
    this.port = process.env.PORT || "3000";
    this.listen()
  }

  private listen(): void {
    
    app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`)
    })
  }
}

export default new Server()