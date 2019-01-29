import app from "./App";

class Server {
  public port: string;

  constructor() {
    this.port = process.env.PORT || "3001";
    this.listen()
  }

  private listen(): void {
    
    app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`)
    })
  }
}

export default new Server()