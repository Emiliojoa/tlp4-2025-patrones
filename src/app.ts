import { runObserver } from "./observer";
import { runAdapter } from "./adapter";
import { runSingleton } from "./singleton";
import { runFactory } from "./factory";


(
  async () => {
    await runObserver();
    await runAdapter();
    await runSingleton();
    await runFactory();
  }
)();